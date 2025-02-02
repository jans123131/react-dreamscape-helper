import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../common/design';

const LocationInfo = ({ location }) => {
  console.log('Rendering LocationInfo with location:', location);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F3E8FF', '#EDE7F6']}
        style={styles.locationSection}
      >
        <View style={styles.iconContainer}>
          <Icon name="location-outline" size={24} color={Colors.secondary} />
        </View>
        
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>Pickup Location</Text>
          <Text style={styles.locationAddress}>{location.address}</Text>
          <Text style={styles.locationDetails}>
            {location.postalCode}, {location.country}
          </Text>
          
          <View style={styles.timeContainer}>
            <Icon name="time-outline" size={16} color={Colors.secondary} />
            <Text style={styles.locationTime}>
              Available: {location.time}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationSection: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  locationDetails: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  locationTime: {
    fontSize: 12,
    color: Colors.secondary,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default LocationInfo;