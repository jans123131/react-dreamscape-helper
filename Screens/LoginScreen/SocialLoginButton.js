import React, { useCallback } from 'react';
import { TouchableOpacity, Text, Alert, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocialLoginButton = ({ provider, navigation, user }) => {
  const { startOAuthFlow } = useOAuth({ strategy: `oauth_${provider}` });

  // Function to check if email exists in the database
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch('http://192.168.1.53:5002/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user: email }),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (result.exists) {
        console.log('User found in database');
      } else {
        console.log('User does not exist');
      }
    } catch (err) {
      console.error('Error checking email:', err);
      Alert.alert('Error', 'Failed to check email existence');
    }
  };

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
        scopes: ['profile', 'email', 'openid'],
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });

        if (user) {
          const userData = {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.imageUrl,
            externalAccounts: user.externalAccounts,
            emailAddresses: user.emailAddresses,
            createdAt: user.createdAt,
            lastSignInAt: user.lastSignInAt
          };

          await checkEmailExists(user.primaryEmailAddress?.emailAddress);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.replace('ScreenHome');
        }
      }
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Authentication Error', `Failed to sign in with ${provider}`);
    }
  }, [startOAuthFlow, navigation, user, provider]);

  const getButtonStyle = () => {
    switch (provider) {
      case 'google':
        return {
          backgroundColor: '#ffffff',
          color: '#DB4437'
        };
      case 'facebook':
        return {
          backgroundColor: '#1877F2',
          color: '#ffffff'
        };
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#000000'
        };
    }
  };

  const getIcon = () => {
    switch (provider) {
      case 'google':
        return 'google';
      case 'facebook':
        return 'facebook';
      default:
        return 'question';
    }
  };

  const styles = getButtonStyle();

  return (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: styles.backgroundColor,
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd'
      }} 
      onPress={onPress}
    >
      <FontAwesome name={getIcon()} size={24} color={styles.color} />
      <Text style={{ marginLeft: 8, color: styles.color, fontSize: 16 }}>
        Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;