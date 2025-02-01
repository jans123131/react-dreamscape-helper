import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions,
} from 'react-native';
import FooterNavigator from '../FooterNavigator/FooterNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Commons/Header';


export default function StoreSceen() {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
              <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
      </ScrollView>
      <FooterNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6',
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
 
});
