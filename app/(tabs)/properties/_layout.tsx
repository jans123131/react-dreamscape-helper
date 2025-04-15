
import { Stack } from 'expo-router';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function PropertiesLayout() {
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user && user.role !== 'owner') {
      // Redirect non-owner users
      router.replace('/(tabs)/profile');
    }
  }, [user, router]);
  
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="create" 
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="edit" 
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
