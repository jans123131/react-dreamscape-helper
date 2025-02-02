import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImpactMetrics() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Impact</Text>
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Icon name="earth" size={32} color="#893571" />
          <View style={styles.metricContent}>
            <Text style={styles.metricNumber}>218</Text>
            <Text style={styles.metricLabel}>Communities Reached</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Icon name="account-group" size={32} color="#893571" />
          <View style={styles.metricContent}>
            <Text style={styles.metricNumber}>1,240</Text>
            <Text style={styles.metricLabel}>People Helped</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Icon name="clock-outline" size={32} color="#893571" />
          <View style={styles.metricContent}>
            <Text style={styles.metricNumber}>80:45</Text>
            <Text style={styles.metricLabel}>Hours of Impact</Text>
          </View>
        </View>
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
  metricsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metricContent: {
    marginLeft: 16,
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});