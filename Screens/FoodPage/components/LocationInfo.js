import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationInfo = ({ location }) => {
  return (
    <View style={styles.locationSection}>
      <Icon name="location-outline" size={24} color="#893571" />
      <View style={styles.locationInfo}>
        <Text style={styles.locationTitle}>Pickup Location</Text>
        <Text style={styles.locationAddress}>{location.address}</Text>
        <Text style={styles.locationDetails}>
          {location.postalCode}, {location.country}
        </Text>
        <View style={styles.availabilityWrapper}>
          <Text style={styles.locationAvailability}>Available:</Text>
          <Text style={styles.locationTime}>{location.time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationSection: {
    flexDirection: 'row',
    backgroundColor: '#EDE7F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#555',
  },
  locationDetails: {
    fontSize: 12,
    color: '#888',
  },
  availabilityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationAvailability: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  locationTime: {
    fontSize: 12,
    color: '#893571',
    fontWeight: '500',
  },
});

export default LocationInfo;