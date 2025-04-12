
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';

// Import TTS conditionally to handle web environment
let Tts = null;
if (Platform.OS !== 'web') {
  try {
    Tts = require('react-native-tts').default;
  } catch (error) {
    console.warn('Failed to import react-native-tts:', error);
  }
}

const TextToSpeech = ({ text, autoPlay = false, language = 'fr-FR' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(false);

  // Initialize TTS on component mount
  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    
    const setupTts = async () => {
      try {
        // Check if TTS is available in this environment
        if (!Tts) {
          console.warn('TTS is not available in this environment');
          return;
        }

        // Check if TTS is already initialized to prevent multiple initializations
        if (!initialized) {
          // Initialize TTS with proper error handlers
          Tts.addEventListener('tts-start', () => {
            if (isMounted) setIsSpeaking(true);
          });
          
          Tts.addEventListener('tts-finish', () => {
            if (isMounted) setIsSpeaking(false);
          });
          
          Tts.addEventListener('tts-cancel', () => {
            if (isMounted) setIsSpeaking(false);
          });
          
          Tts.addEventListener('tts-error', (error) => {
            console.error('TTS error:', error);
            if (isMounted) setIsSpeaking(false);
          });
          
          try {
            // Set language to French
            await Tts.setDefaultLanguage(language);
            await Tts.setDefaultRate(0.5); // Slower rate for better comprehension
            await Tts.setDefaultPitch(1.0);
            
            if (isMounted) {
              setTtsAvailable(true);
              setInitialized(true);
              setIsReady(true);
              
              // Auto-play if enabled
              if (autoPlay && text) {
                setTimeout(() => {
                  if (isMounted) {
                    speak(text);
                  }
                }, 1000); // Delay a bit to ensure UI is ready
              }
            }
          } catch (initError) {
            console.error('TTS initialization error:', initError);
            if (isMounted) {
              setTtsAvailable(false);
              setInitialized(false);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize TTS:', error);
        if (isMounted) {
          setTtsAvailable(false);
          setInitialized(false);
        }
      }
    };

    // Platform-specific TTS setup
    if (Platform.OS === 'web') {
      // For web, we might want to use the Web Speech API instead
      console.warn('TTS not fully supported on web platform');
      if (isMounted) {
        setTtsAvailable(false);
        setInitialized(false);
      }
    } else {
      setupTts();
    }
    
    // Clean up on unmount
    return () => {
      isMounted = false; // Update flag to prevent state updates after unmount
      
      // Check if Tts is available before calling methods on it
      if (Tts) {
        try {
          // Only stop if currently speaking
          if (isSpeaking) {
            Tts.stop().catch(err => console.error('Error stopping TTS:', err));
          }
          
          // Remove all listeners safely
          if (initialized) {
            Tts.removeEventListener('tts-start');
            Tts.removeEventListener('tts-finish');
            Tts.removeEventListener('tts-cancel');
            Tts.removeEventListener('tts-error');
          }
        } catch (error) {
          console.error('Error during TTS cleanup:', error);
        }
      }
    };
  }, []);
  
  // Update when text changes
  useEffect(() => {
    if (text && isReady && autoPlay && initialized && ttsAvailable) {
      speak(text);
    }
  }, [text, isReady, initialized, ttsAvailable]);

  const speak = async (textToSpeak) => {
    try {
      // Safety check to ensure TTS is initialized and available
      if (!initialized || !ttsAvailable || !Tts) {
        console.error('TTS not initialized or not available');
        return;
      }

      if (isSpeaking) {
        // Make sure Tts exists before calling stop
        try {
          await Tts.stop();
          setIsSpeaking(false);
        } catch (error) {
          console.error('Error stopping TTS:', error);
        }
      } else {
        // Make sure Tts exists before speaking
        try {
          await Tts.speak(textToSpeak);
        } catch (error) {
          console.error('Error speaking text:', error);
        }
      }
    } catch (error) {
      console.error('TTS error when speaking:', error);
    }
  };

  // Render nothing if TTS is not available (especially on web)
  if (!ttsAvailable && Platform.OS === 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => speak(text)}
      >
        {isSpeaking ? (
          <Icons.Pause size={20} color={COLORS.primary} />
        ) : (
          <Icons.Play size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: SPACING.xs,
    borderRadius: 20,
    backgroundColor: COLORS.light_gray,
  },
});

export default TextToSpeech;
