import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '../../common/SuccessModal';
import { Picker } from '@react-native-picker/picker'; // Picker for country select
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

WebBrowser.maybeCompleteAuthSession();
export default function SignupScreen({ navigation }) {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { user } = useUser();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !firstname || !lastname || !country) {
      alert('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.53:5002/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_user: email,
          firstname_user: firstname,
          lastname_user: lastname,
          name_user: firstname + ' ' + lastname,
          password_user: password,
          country_user: country,
          image_user: 'null',
          auth_method_user: 'normal',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalVisible(true);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again later.');
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
          navigation.replace('ScreenHome');
        }
      }
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Authentication Error', 'Failed to sign in with Google');
    }
  }, [startOAuthFlow, navigation, user]);

  return (
    <>
    <ImageBackground
      source={require('../../assets/bgcover.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={styles.goBackIcon}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Card style={styles.card}>
              <Text style={styles.title}>{t('SignupScreen.create_account')}</Text>
              <Text style={styles.subtitle}>{t('SignupScreen.sign_up_start')}</Text>

              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('SignupScreen.first_name')}
                  style={styles.input}
                  value={firstname}
                  onChangeText={setFirstname}
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('SignupScreen.last_name')}
                  style={styles.input}
                  value={lastname}
                  onChangeText={setLastname}
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('SignupScreen.email')}
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="public" size={24} color="#b8658f" />
                <Picker
                  selectedValue={country}
                  style={styles.input}
                  onValueChange={(itemValue) => setCountry(itemValue)}
                >
                  <Picker.Item label={t('SignupScreen.select_country')} value="" />
                  <Picker.Item label={t('SignupScreen.united_states')} value="United States" />
                  <Picker.Item label={t('SignupScreen.canada')} value="Canada" />
                </Picker>
              </View>
                
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('SignupScreen.password')}
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <MaterialIcons
                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#b8658f" />
                <TextInput
                  placeholder={t('SignupScreen.confirm_password')}
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  <MaterialIcons
                    name={isConfirmPasswordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSignup}>
                <LinearGradient
                  colors={['#b8658f', '#893571']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>{t('SignupScreen.sign_up_button')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <Text style={styles.orText}>{t('SignupScreen.or')}</Text>
              </View>

              <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
                <FontAwesome name="google" size={24} color="#893571" />
                <Text style={styles.googleText}>{t('SignupScreen.sign_in_google')}</Text>
              </TouchableOpacity>
            </Card>

            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>
                {t('SignupScreen.already_account')}{' '}
                <Text
                  style={styles.signupLink}
                  onPress={() => navigation.goBack()}
                >
                  {t('SignupScreen.login')}
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
    <SuccessModal
      isVisible={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
        navigation.navigate('Login');
      }}
      message="Thank you for joining our community!"
    />
    </>
  );
}

const styles = {
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
  goBackIcon: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 1,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.03,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
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
  bottomTextContainer: {
    marginLeft: width *0.01,
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
  },
  bottomText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  signupLink: {
    color: '#b8658f',
    fontWeight: 'bold',
  },
};
