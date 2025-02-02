import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import Header from '../Commons/Header';
import DonationStats from './Components/DonationStats';
import ImpactMetrics from './Components/ImpactMetrics';
import TopDonors from './Components/TopDonors';
import { LinearGradient } from 'expo-linear-gradient';
import FooterNavigator from '../FooterNavigator/FooterNavigator';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#ffffff', '#fef6fa']}
          style={styles.gradient}
        >
          <DonationStats />
          <ImpactMetrics />
          <TopDonors />
        </LinearGradient>
      </ScrollView>
      <FooterNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  gradient: {
    padding: 16,
    minHeight: '100%',
  },
});