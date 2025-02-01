import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from './CustomMarker';
import { useNavigation } from '@react-navigation/native';

const MapComponent = () => {
  const [foodLocations, setFoodLocations] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const abortControllerRef = useRef(null);

  const fetchFoodLocations = async () => {
    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch('http://192.168.1.53:5002/api/foods/foodlocations', {
        signal: abortControllerRef.current.signal
      });
      const data = await response.json();
      setFoodLocations(data);

      // Find the center of the area with most markers
      if (data.length > 0) {
        const centerPoint = findCenterOfMostDenseArea(data);
        setInitialRegion({
          latitude: centerPoint.latitude,
          longitude: centerPoint.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Error fetching food locations:', error);
    }
  };

  const findCenterOfMostDenseArea = (locations) => {
    // Simple algorithm to find the center of the area with most markers
    // You could make this more sophisticated based on your needs
    const gridSize = 0.01; // roughly 1km
    const grid = {};

    locations.forEach(location => {
      const lat = parseFloat(location.availability.altitude_availability.replace(/\"/g, ''));
      const lng = parseFloat(location.availability.longitude_availability.replace(/\"/g, ''));
      
      const gridKey = `${Math.floor(lat/gridSize)},${Math.floor(lng/gridSize)}`;
      if (!grid[gridKey]) grid[gridKey] = [];
      grid[gridKey].push({ lat, lng });
    });

    let maxCount = 0;
    let densestGrid = null;

    Object.entries(grid).forEach(([key, points]) => {
      if (points.length > maxCount) {
        maxCount = points.length;
        densestGrid = points;
      }
    });

    if (densestGrid) {
      const centerLat = densestGrid.reduce((sum, point) => sum + point.lat, 0) / densestGrid.length;
      const centerLng = densestGrid.reduce((sum, point) => sum + point.lng, 0) / densestGrid.length;
      return { latitude: centerLat, longitude: centerLng };
    }

    // Fallback to first location if no dense area found
    return {
      latitude: parseFloat(locations[0].availability.altitude_availability.replace(/\"/g, '')),
      longitude: parseFloat(locations[0].availability.longitude_availability.replace(/\"/g, '')),
    };
  };

  useEffect(() => {
    fetchFoodLocations();

    return () => {
      // Cleanup function
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (initialRegion && mapRef.current) {
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
  }, [initialRegion]);

  const handleMarkerPress = (foodId) => {
    navigation.navigate('FoodDetail', { foodId });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion || {
          latitude: 45.5017,
          longitude: -73.5673,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {foodLocations.map((food) => (
          <CustomMarker
            key={food.id_food}
            food={food}
            onPress={() => handleMarkerPress(food.id_food)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;