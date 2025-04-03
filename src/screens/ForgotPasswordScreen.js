
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { FONT_SIZE, FONT_FAMILY } from '../theme/typography';
import EmailStep from '../components/forgotPassword/EmailStep';
import VerificationStep from '../components/forgotPassword/VerificationStep';
import ResetPasswordStep from '../components/forgotPassword/ResetPasswordStep';
import SuccessStep from '../components/forgotPassword/SuccessStep';
import { ROUTES } from '../navigation/navigationConstants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { forgotPassword, resetPassword } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // For debugging purposes
  useEffect(() => {
    console.log('Current step:', currentStep);
    console.log('Email:', email);
    console.log('Reset code:', resetCode);
  }, [currentStep, email, resetCode]);

  // Génère un code de vérification à 4 chiffres aléatoire
  // (Generates a random 4-digit verification code)
  const generateVerificationCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    console.log('Generated code:', code);
    return code;
  };

  // Gère la soumission de l'email et l'envoi du code de vérification
  // (Handles email submission and sending verification code)
  const handleEmailSubmit = async (submittedEmail) => {
    console.log('Email submit handler called with:', submittedEmail);
    
    if (!submittedEmail || typeof submittedEmail !== 'string' || !submittedEmail.includes('@')) {
      setError(t('forgotPassword.invalidEmail') || 'Email invalide');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      // Génère un code aléatoire
      // (Generate a random code)
      const code = generateVerificationCode();
      
      // Utiliser la fonction forgotPassword du contexte Auth
      // (Use the forgotPassword function from Auth context)
      await forgotPassword(submittedEmail, code);
      
      console.log('Code envoyé avec succès:', code);
      
      // Stocke l'email et le code pour une vérification ultérieure
      // (Store email and code for later verification)
      setEmail(submittedEmail);
      setResetCode(code);
      
      // Passe à l'étape suivante
      // (Move to the next step)
      setCurrentStep(2);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du code:', err);
      Alert.alert(
        t('forgotPassword.errorTitle') || 'Erreur',
        t('forgotPassword.emailError') || 'Échec de l\'envoi du code de vérification'
      );
      setError(t('forgotPassword.emailError') || 'Échec de l\'envoi du code de vérification');
    } finally {
      setLoading(false);
    }
  };

  // Gère la soumission du code de vérification
  // (Handles verification code submission)
  const handleVerificationSubmit = (code) => {
    console.log('Verification submit handler called with:', code);
    
    setError('');
    setLoading(true);
    
    try {
      // Formatter le code pour la comparaison
      // (Format the code for comparison)
      let codeString;
      
      if (Array.isArray(code)) {
        codeString = code.join('');
      } else if (typeof code === 'string') {
        codeString = code;
      } else if (code === undefined || code === null) {
        throw new Error('Code de vérification manquant');
      } else {
        codeString = String(code);
      }
      
      console.log('Comparing codes:', codeString, resetCode);
      
      // Vérifie si le code entré correspond au code généré
      // (Check if entered code matches the generated code)
      if (codeString === resetCode) {
        console.log('Code verified successfully');
        
        // Stocke le code pour les étapes suivantes
        // (Store code for next steps)
        if (Array.isArray(code)) {
          setVerificationCode(code);
        } else if (typeof code === 'string') {
          setVerificationCode(code.split(''));
        }
        
        // Passe à l'étape suivante
        // (Move to the next step)
        setCurrentStep(3);
      } else {
        console.log('Code verification failed');
        throw new Error(t('forgotPassword.verificationError') || 'Code de vérification invalide');
      }
    } catch (err) {
      console.error('Erreur de vérification du code:', err);
      Alert.alert(
        t('forgotPassword.errorTitle') || 'Erreur',
        err.message || t('forgotPassword.verificationError') || 'Code de vérification invalide'
      );
      setError(err.message || t('forgotPassword.verificationError') || 'Code de vérification invalide');
    } finally {
      setLoading(false);
    }
  };

  // Gère la réinitialisation du mot de passe
  // (Handles password reset)
  const handlePasswordReset = async (password) => {
    console.log('Password reset handler called');
    
    setError('');
    setLoading(true);
    try {
      // Utiliser la fonction resetPassword du contexte Auth
      // (Use the resetPassword function from Auth context)
      await resetPassword(email, resetCode, password);
      
      console.log('Mot de passe réinitialisé avec succès pour:', email);
      
      // Passe à l'étape finale
      // (Move to the final step)
      setCurrentStep(4);
    } catch (err) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', err);
      Alert.alert(
        t('forgotPassword.errorTitle') || 'Erreur',
        t('forgotPassword.resetError') || 'Échec de la réinitialisation du mot de passe'
      );
      setError(t('forgotPassword.resetError') || 'Échec de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  // Gère le retour à la page de connexion après réinitialisation réussie
  // (Handles return to login page after successful reset)
  const handleReturnToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  // Rendu de l'étape appropriée en fonction de currentStep
  // (Render the appropriate step based on currentStep)
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep onSubmit={handleEmailSubmit} loading={loading} error={error} />;
      case 2:
        return (
          <VerificationStep 
            email={email} 
            onSubmit={handleVerificationSubmit} 
            onResendCode={() => handleEmailSubmit(email)}
            loading={loading} 
            error={error}
          />
        );
      case 3:
        return <ResetPasswordStep onSubmit={handlePasswordReset} loading={loading} error={error} />;
      case 4:
        return <SuccessStep onReturnToLogin={handleReturnToLogin} />;
      default:
        return <EmailStep onSubmit={handleEmailSubmit} loading={loading} error={error} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('forgotPassword.title') || 'Reset Password'}
            </Text>
            <Text style={styles.subtitle}>
              {t('forgotPassword.subtitle') || 'Follow the steps to reset your password'}
            </Text>
          </View>
          
          <View style={styles.stepIndicatorContainer}>
            {[1, 2, 3, 4].map((step) => (
              <View 
                key={step}
                style={[
                  styles.stepIndicator,
                  currentStep >= step ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                {currentStep > step ? (
                  <Text style={styles.stepCheckmark}>✓</Text>
                ) : (
                  <Text style={currentStep === step ? styles.activeStepText : styles.inactiveStepText}>
                    {step}
                  </Text>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.content}>
            {renderStep()}
          </View>
          
          {currentStep !== 4 && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => {
                // Instead of navigating away, we just go back to the previous step
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                } else {
                  navigation.navigate(ROUTES.LOGIN);
                }
              }}
              disabled={loading}
            >
              <Text style={styles.backButtonText}>
                {currentStep > 1 
                  ? (t('forgotPassword.backToStep') || 'Back to Previous Step') 
                  : (t('forgotPassword.backToLogin') || 'Back to Login')}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
  },
  inactiveStep: {
    backgroundColor: COLORS.light_gray,
  },
  activeStepText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  inactiveStepText: {
    color: COLORS.gray,
    fontWeight: '600',
  },
  stepCheckmark: {
    color: COLORS.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginBottom: SPACING.lg,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: SPACING.md,
    padding: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
  },
});

export default ForgotPasswordScreen;
