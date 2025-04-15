
import React from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';

export default function PropertiesTab() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to first page - we're using /properties/index now
    router.replace('/(tabs)/properties/index');
    
    // Redirect non-owner users
    if (user && user.role !== 'owner') {
      router.replace('/(tabs)/profile');
    }
  }, [user, router]);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#9b87f5" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
