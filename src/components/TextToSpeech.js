
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';

// We'll handle Tts as a module that gets loaded asynchronously
let Tts = null;
let ttsInitializationPromise = null;

// Function to initialize TTS module
const initializeTtsModule = async () => {
  if (Platform.OS === 'web') {
    console.warn('TTS not supported on web platform');
    return null;
  }
  
  if (!ttsInitializationPromise) {
    ttsInitializationPromise = new Promise(async (resolve) => {
      try {
        // Import the module
        const ttsModule = await import('react-native-tts');
        resolve(ttsModule.default);
      } catch (error) {
        console.warn('Failed to import react-native-tts:', error);
        resolve(null);
      }
    });
  }
  
  return ttsInitializationPromise;
};

const TextToSpeech = ({ text, autoPlay = false, language = 'fr-FR' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(false);
  const [ttsModule, setTtsModule] = useState(null);

  // Initialize TTS on component mount
  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    
    const setupTts = async () => {
      try {
        // Load the TTS module
        const loadedTtsModule = await initializeTtsModule();
        
        if (!isMounted) return;
        
        if (!loadedTtsModule) {
          console.warn('TTS is not available in this environment');
          setTtsAvailable(false);
          return;
        }

        // Store the TTS module reference
        setTtsModule(loadedTtsModule);
        
        // Initialize TTS with proper error handlers
        loadedTtsModule.addEventListener('tts-start', () => {
          if (isMounted) setIsSpeaking(true);
        });
        
        loadedTtsModule.addEventListener('tts-finish', () => {
          if (isMounted) setIsSpeaking(false);
        });
        
        loadedTtsModule.addEventListener('tts-cancel', () => {
          if (isMounted) setIsSpeaking(false);
        });
        
        loadedTtsModule.addEventListener('tts-error', (error) => {
          console.error('TTS error:', error);
          if (isMounted) setIsSpeaking(false);
        });
        
        try {
          // Set language to French
          await loadedTtsModule.setDefaultLanguage(language);
          await loadedTtsModule.setDefaultRate(0.5); // Slower rate for better comprehension
          await loadedTtsModule.setDefaultPitch(1.0);
          
          if (isMounted) {
            setTtsAvailable(true);
            setInitialized(true);
            setIsReady(true);
            
            // Auto-play if enabled
            if (autoPlay && text) {
              setTimeout(() => {
                if (isMounted && loadedTtsModule) {
                  speak(text, loadedTtsModule);
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
      } catch (error) {
        console.error('Failed to initialize TTS:', error);
        if (isMounted) {
          setTtsAvailable(false);
          setInitialized(false);
        }
      }
    };

    // Setup TTS based on platform
    if (Platform.OS !== 'web') {
      setupTts();
    } else {
      if (isMounted) {
        setTtsAvailable(false);
        setInitialized(false);
      }
    }
    
    // Clean up on unmount
    return () => {
      isMounted = false; // Update flag to prevent state updates after unmount
      
      // Cleanup TTS if initialized
      if (ttsModule && initialized) {
        try {
          // Only stop if currently speaking
          if (isSpeaking) {
            ttsModule.stop().catch(err => console.error('Error stopping TTS:', err));
          }
          
          // Remove all listeners
          ttsModule.removeAllListeners();
        } catch (error) {
          console.error('Error during TTS cleanup:', error);
        }
      }
    };
  }, []);
  
  // Update when text changes
  useEffect(() => {
    if (text && isReady && autoPlay && initialized && ttsAvailable && ttsModule) {
      speak(text, ttsModule);
    }
  }, [text, isReady, initialized, ttsAvailable, ttsModule]);

  const speak = async (textToSpeak, ttsInstance) => {
    try {
      // Safety check to ensure TTS is initialized and available
      if (!initialized || !ttsAvailable || !ttsInstance) {
        console.error('TTS not initialized or not available');
        return;
      }

      if (isSpeaking) {
        // Stop speaking
        try {
          await ttsInstance.stop();
          setIsSpeaking(false);
        } catch (error) {
          console.error('Error stopping TTS:', error);
        }
      } else {
        // Start speaking
        try {
          await ttsInstance.speak(textToSpeak);
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
        onPress={() => ttsModule && speak(text, ttsModule)}
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
