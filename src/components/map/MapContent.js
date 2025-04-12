import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import PlaceCallout from '../PlaceCallout';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../navigation/navigationConstants';

const MapContent = ({ 
  mapRef, 
  initialRegion, 
  userLocation, 
  filteredPlaces,
  searchResults,
  onRegionChangeComplete
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  // Determine which places to display: searchResults or filteredPlaces
  const displayPlaces = searchResults && searchResults.length > 0 ? searchResults : filteredPlaces;

  // Initialize map with user location when available
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }, [userLocation]);

  // Focus map on search results when they change
  useEffect(() => {
    if (mapRef.current && searchResults && searchResults.length > 0) {
      // If there's just one result, zoom to it
      if (searchResults.length === 1) {
        const place = searchResults[0];
        const latitude = parseFloat(place.location?.latitude) || 0;
        const longitude = parseFloat(place.location?.longitude) || 0;
        
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } 
      // Otherwise fit all results on screen
      else {
        const coordinates = searchResults.map(place => ({
          latitude: parseFloat(place.location?.latitude) || 0,
          longitude: parseFloat(place.location?.longitude) || 0,
        }));
        
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
          animated: true,
        });
      }
    }
  }, [searchResults]);

  // Handle navigation to place details
  const handlePlacePress = (place) => {
    navigation.navigate(ROUTES.PLACE_DETAILS, { placeId: place.id });
  };

  // Use useMemo to stabilize the place markers and prevent unnecessary re-renders
  const placeMarkers = useMemo(() => {
    return displayPlaces.map((place) => (
      <Marker
        key={`place-${place.id}`}
        identifier={`marker-${place.id}`}
        coordinate={{
          latitude: parseFloat(place.location?.latitude) || 0,
          longitude: parseFloat(place.location?.longitude) || 0,
        }}
        pinColor={COLORS.primary}
        onPress={() => handlePlacePress(place)}
      >
        <Callout tooltip onPress={() => handlePlacePress(place)}>
          <PlaceCallout 
            place={place} 
            onDetailsPress={() => handlePlacePress(place)}
          />
        </Callout>
      </Marker>
    ));
  }, [displayPlaces, navigation]);

  return (
    <View style={styles.mapWrapper}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        onRegionChangeComplete={onRegionChangeComplete}
        toolbarEnabled={Platform.OS === 'android'}
        loadingEnabled={true}
        loadingIndicatorColor={COLORS.primary}
        loadingBackgroundColor={COLORS.white}
        moveOnMarkerPress={false}
        pitchEnabled={true}
        rotateEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={Platform.OS === 'android'}
        customMapStyle={[
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e9e9e9"
              },
              {
                "lightness": 17
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#d0e9c6"
              },
              {
                "lightness": 21
              }
            ]
          }
        ]}
      >
        {/* Only render Circle if userLocation is valid and has both latitude and longitude */}
        {userLocation && 
         userLocation.latitude && 
         userLocation.longitude && (
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={500}
            strokeColor={COLORS.primary}
            fillColor={`${COLORS.primary}20`}
            strokeWidth={1}
          />
        )}
        {placeMarkers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapWrapper: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default MapContent;
