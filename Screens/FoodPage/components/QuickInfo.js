import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QuickInfo = ({ quantity, quantityType, allergens, isFrozen }) => {
  return (
    <View style={styles.quickInfoContainer}>
      <View style={styles.infoCard}>
        <Icon name="restaurant-outline" size={24} color="#893571" />
        <Text style={styles.infoLabel}>{quantity} {quantityType}</Text>
      </View>
      <View style={styles.infoCard}>
        <Icon name="warning-outline" size={24} color="#893571" />
        <Text style={styles.infoLabel}>{allergens.join(', ')}</Text>
      </View>
      <View style={styles.infoCard}>
        <Icon name="checkmark-circle-outline" size={24} color="#893571" />
        <Text style={styles.infoLabel}>{isFrozen}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quickInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
  },
});

export default QuickInfo;