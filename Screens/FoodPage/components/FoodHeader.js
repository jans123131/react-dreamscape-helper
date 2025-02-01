import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodHeader = ({ title, hallal, foodtype, expiryDate }) => {
  return (
    <View style={styles.headerSection}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {hallal === 'Halal' && (
          <View style={[styles.statusContainer, { backgroundColor: '#43A047' }]}>
            <Text style={styles.statusText}>
              {hallal} ✅
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.dateText}>Category: {foodtype}</Text>
      <Text style={styles.dateText}>Expires: {expiryDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    color: '#666',
    fontSize: 14,
  },
});

export default FoodHeader;