import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FoodMarkerModal = ({ isVisible, onClose, foodData }) => {
  const navigation = useNavigation();

  if (!foodData) return null;

  const handleViewDetails = () => {
    navigation.navigate('FoodDetail', { foodId: foodData.id_food });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#893571" />
          </TouchableOpacity>

          {foodData.images?.length > 0 && (
            <Image
              source={{ uri: `http://192.168.1.53:5002/api/${foodData.images[0]}` }}
              style={styles.foodImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{foodData.name_food}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {foodData.description_food}
            </Text>

            <View style={styles.detailsRow}>
              <Icon name="location-outline" size={20} color="#893571" />
              <Text style={styles.detailText}>
                {foodData.availability?.adresse_availability || 'No address available'}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Icon name="time-outline" size={20} color="#893571" />
              <Text style={styles.detailText}>
                {foodData.availability?.time_availability || 'No time available'}
              </Text>
            </View>

            <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#893571',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailsButton: {
    backgroundColor: '#b8658f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodMarkerModal;
