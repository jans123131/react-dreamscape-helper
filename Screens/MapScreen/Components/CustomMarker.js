import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodMarkerModal from './FoodMarkerModal';

const CustomMarker = ({ food }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = () => {
    if (!modalVisible) {
      console.log('Marker pressed for food:', food.name_food);
      setModalVisible(true);
    }
  };

  return (
    <>
      <Marker
        coordinate={{
          latitude: parseFloat(food.availability?.altitude_availability?.replace(/\"/g, '')) || 0,
          longitude: parseFloat(food.availability?.longitude_availability?.replace(/\"/g, '')) || 0,
        }}
        onPress={handleMarkerPress}
      >
        <View style={styles.markerContainer}>
          <View style={styles.markerOuter}>
            <Icon name="fast-food" size={20} color="#893571" />
          </View>
          <View style={styles.markerTriangle} />
        </View>
      </Marker>

      <FoodMarkerModal
        key={food.id_food} // Forces a fresh render
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        foodData={food}
      />
    </>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerOuter: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});

export default CustomMarker;
