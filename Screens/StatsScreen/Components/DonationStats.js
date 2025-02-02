import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DonationStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation Impact</Text>
      <View style={styles.statsGrid}>
        <LinearGradient
          colors={['#893571', '#b8658f']}
          style={styles.statCard}
        >
          <Icon name="food" size={32} color="#fff" />
          <Text style={styles.statNumber}>12,048</Text>
          <Text style={styles.statLabel}>Meals Donated</Text>
        </LinearGradient>

        <LinearGradient
          colors={['#b8658f', '#893571']}
          style={styles.statCard}
        >
          <Icon name="currency-usd" size={32} color="#fff" />
          <Text style={styles.statNumber}>$45,230</Text>
          <Text style={styles.statLabel}>Value Donated</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#893571',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});