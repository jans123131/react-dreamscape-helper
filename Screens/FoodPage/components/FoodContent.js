import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodHeader from './FoodHeader';
import QuickInfo from './QuickInfo';
import LocationInfo from './LocationInfo';

const FoodContent = ({ foodData, onRequestFood }) => {
  return (
    <View style={styles.contentWrapper}>
      <FoodHeader 
        title={foodData.title}
        hallal={foodData.hallal}
        foodtype={foodData.foodtype}
        expiryDate={foodData.expiryDate}
      />

      <QuickInfo 
        quantity={foodData.actualquantity_food}
        quantityType={foodData.quantitytype_food}
        allergens={foodData.allergens}
        isFrozen={foodData.isfrozen}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this food</Text>
        <Text style={styles.description}>{foodData.description}</Text>
      </View>

      <LocationInfo location={foodData.location} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <Text style={styles.description}>{foodData.additionalnote}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { opacity: foodData.status === 'Available' ? 1 : 0.6 }
          ]}
          disabled={foodData.status !== 'Available'}
          onPress={onRequestFood}
        >
          <Text style={styles.actionButtonText}>
            {foodData.status === 'Available' ? 'Request Food' : 'Currently Reserved'}
          </Text>
          <Icon 
            name={foodData.status === 'Available' ? 'arrow-forward-outline' : 'lock-closed-outline'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    fontFamily: 'System',
  },
  bottomContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#893571',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'System',
  },
});

export default FoodContent;