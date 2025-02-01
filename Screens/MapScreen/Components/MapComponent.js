import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapCustomStyle } from '../mapStyle';
import { Colors } from '../../../common/design';

const INITIAL_REGION = {
  latitude: 24.8607,
  longitude: 67.0011,
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
        const parsedData = data.map((item) => ({
          id: item.id_food,
          name: item.name_food,
          description: item.description_food,
          coordinate: {
            latitude: parseFloat(item.availability.altitude_availability.replace(/\"/g, '')),
            longitude: parseFloat(item.availability.longitude_availability.replace(/\"/g, '')),
          },
        }));
        setFoodLocations(parsedData);
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
        showsMyLocationButton={true}
      >
        {foodLocations.map((foodLocation) => (
          <Marker
            key={foodLocation.id}
            coordinate={foodLocation.coordinate}
            tracksViewChanges={false}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerOuter}>
                <View style={styles.markerInner}>
                  <View style={styles.markerDot} />
                </View>
              </View>
              <View style={styles.markerTriangle} />
            </View>
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{foodLocation.name}</Text>
                <Text style={styles.calloutDescription}>{foodLocation.description}</Text>
              </View>
            </Callout>
          </Marker>
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
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary,
    transform: [{ translateY: -5 }],
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default MapComponent;