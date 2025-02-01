import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { user } = useUser();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      console.log('User email: ', user.primaryEmailAddress?.emailAddress);
      // Check if the login method is Gmail or normal
      if (method === 'gmail') {
        navigation.replace('ScreenHome');
      } else {
        navigation.replace('ScreenHome');
      }
    }
  }, [user, navigation, method]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.53:5002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user: email, password_user: password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful:', result);

        if (result) {
          const userData = {
            id_user: result.user.id_user,
            email_user: result.user.email_user,
            firstname_user: result.user.firstname_user,
            lastname_user: result.user.lastname_user,
            name_user: result.user.name_user,
            image_user: result.user.image_user,
            auth_method_user: result.user.auth_method_user,
            country_user: result.user.country_user,
            created_at_user: result.user.created_at_user,
          };

          await AsyncStorage.setItem('userDataNorma', JSON.stringify(userData));
          setMethod('normal');
          navigation.replace('ScreenHome');
        } else {
          console.error('Token missing in response');
          Alert.alert('Login Failed', 'Token not received from server.');
        }
      } else {
        console.error('Login failed:', result.message);
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = useCallback(async () => {
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
            lastSignInAt: user.lastSignInAt,
          };
          console.log(userData);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));

          setMethod('gmail');
          navigation.replace('ScreenHome');
        }
      }
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Authentication Error', 'Failed to sign in with Google');
    }
  }, [startOAuthFlow, navigation, user]);

  return (
    <ImageBackground source={require('../../assets/bgcover.png')} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <Card style={styles.card}>
              <Text style={styles.title}>{t('LoginScreen.welcome_back')}</Text>
              <Text style={styles.subtitle}>{t('LoginScreen.login_to_continue')}</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('LoginScreen.enter_email')}
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('LoginScreen.enter_password')}
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgetScreen')}>
                <Text style={styles.forgotPassword}>{t('LoginScreen.forgot_password')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogin} disabled={loading}>
                <LinearGradient colors={['#b8658f', '#893571']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={styles.gradientButton}>
                  <Text style={styles.buttonText}>
                    {loading ? t('LoginScreen.logging_in') : t('LoginScreen.login')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <Text style={styles.orText}>{t('LoginScreen.or')}</Text>
              </View>

              <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
                <FontAwesome name="google" size={24} color="#893571" />
                <Text style={styles.googleText}>{t('LoginScreen.sign_in_google')}</Text>
              </TouchableOpacity>
              
            </Card>
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.bottomText}>
                  {t('LoginScreen.dont_have_account')}{' '}
                  <Text style={styles.signupLink}>{t('LoginScreen.sign_up')}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  card: {
    marginHorizontal: width * 0.05,
    padding: width * 0.05,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: 'white',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    height: height * 0.06,
  },
  input: {
    flex: 1,
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  forgotPassword: {
    color: '#b8658f',
    textAlign: 'right',
    marginBottom: height * 0.02,
    fontSize: width * 0.035,
  },
  gradientButton: {
    borderRadius: 8,
    padding: height * 0.018,
    marginVertical: height * 0.01,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: height * 0.018,
  },
  googleText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  orContainer: {
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  orText: {
    fontSize: width * 0.04,
    color: '#888',
  },
  bottomContainer: {
    marginTop: height * 0.02,
    marginLeft: width * 0.01,
    textAlign: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  signupLink: {
    color: '#b8658f',
    fontWeight: 'bold',
  },
});
