import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapCustomStyle } from '../mapStyle';
import { Colors } from '../../../common/design';
import CustomMarker from './CustomMarker';

const INITIAL_REGION = {
  latitude: 45.5017,
  longitude: -73.5673,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [foodLocations, setFoodLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const isMounted = useRef(true);

  const fetchFoodLocations = async () => {
    try {
      const response = await fetch('http://192.168.1.53:5002/api/foods/foodlocations');
      const data = await response.json();
      if (isMounted.current) {
        // Filter out food items without valid coordinates
        const validFoodLocations = data.filter(item => 
          item.availability && 
          item.availability.altitude_availability && 
          item.availability.longitude_availability
        );
        console.log('Valid food locations:', validFoodLocations);
        setFoodLocations(validFoodLocations);
      }
    } catch (error) {
      console.error('Error fetching food locations:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      if (isMounted.current) {
        setLocation(currentLocation);
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    
    const initializeMap = async () => {
      setIsLoading(true);
      await getCurrentLocation();
      await fetchFoodLocations();
      if (isMounted.current) {
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapCustomStyle}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {foodLocations.map((food) => (
          <CustomMarker key={food.id_food} food={food} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MapComponent;