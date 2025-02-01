import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomMarker = ({ food, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: parseFloat(food.availability.altitude_availability.replace(/\"/g, '')),
        longitude: parseFloat(food.availability.longitude_availability.replace(/\"/g, '')),
      }}
      onPress={onPress}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerOuter}>
          <View style={styles.markerInner}>
            <Icon name="fast-food" size={16} color="#893571" />
          </View>
        </View>
        <View style={styles.markerTriangle} />
      </View>
      <Callout tooltip>
        <View style={styles.calloutContainer}>
          <Image 
            source={{ uri: `http://192.168.1.53:5002/api/${food.first_image}` }}
            style={styles.calloutImage}
          />
          <View style={styles.calloutContent}>
            <Text style={styles.calloutTitle}>{food.name_food.replace(/\"/g, '')}</Text>
            <Text style={styles.calloutDescription} numberOfLines={2}>
              {food.description_food.replace(/\"/g, '')}
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8e5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    transform: [{ translateY: -5 }],
  },
  calloutContainer: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  calloutContent: {
    padding: 12,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: '#893571',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CustomMarker;