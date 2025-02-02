import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../common/design';
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
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
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
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
});