import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import ImpaContainer from './Components/ImpaContainer';
import QuickActions from './Components/QuickActions';
import UrgentNeedsAndCampaigns from './Components/UrgentNeedsAndCampaigns';
import LatestArticles from './Components/LatestArticles';
import FooterNavigator from '../FooterNavigator/FooterNavigator';

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImpaContainer />
          <QuickActions />
          <LatestArticles />
          <UrgentNeedsAndCampaigns />
        </ScrollView>
      </View>
      <FooterNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6',
  },
  contentContainer: {
    flex: 1, // Ensures ScrollView takes available space
  },
  scrollContainer: {
    paddingBottom: 80, // Adjust padding according to FooterNavigator height
    paddingHorizontal: 16,
  },
});

