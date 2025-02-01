import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';
import Cards4 from './Components/Cards4';
import { useTranslation } from 'react-i18next';
import FooterNavigator from '../FooterNavigator/FooterNavigator';

export default function CommunityScreen() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.communityHeader}>
            <LinearGradient colors={['#893571', '#b8658f']} style={styles.communityBanner}>
              <Text style={styles.bannerText}>{t('CommunityScreen.WelcomeToTheCommunity')}</Text>
              <Text style={styles.bannerSubText}>{t('CommunityScreen.SupportLocalShareAndConnect')}</Text>
            </LinearGradient>
          </View>
          
          <Cards4 />
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
    paddingBottom: 80, 
    paddingHorizontal: 15,
  },
  communityHeader: {
    marginTop:'5%',
    marginBottom: 16,
    
  },
  communityBanner: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
});
