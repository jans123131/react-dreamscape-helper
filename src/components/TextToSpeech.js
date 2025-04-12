
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';

// Global variable to track if we've already shown the warning
let warnedAboutTTS = false;

const TextToSpeech = ({ text, autoPlay = false, language = 'fr-FR' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(false);

  // Initialize TTS on component mount
  useEffect(() => {
    let isMounted = true;
    let Tts = null;

    // Function to load and initialize TTS
    const setupTts = async () => {
      try {
        // Skip TTS setup on web or Expo Go
        if (Platform.OS === 'web' || (global.expo && global.expo.modules)) {
          if (!warnedAboutTTS) {
            console.warn('TTS is not fully supported in Expo Go. For full TTS functionality, build a development client.');
            warnedAboutTTS = true;
          }
          return;
        }

        // Dynamically import TTS module
        const ttsModule = await import('react-native-tts').catch(err => {
          console.error('Failed to import react-native-tts:', err);
          return null;
        });

        // Check if component is still mounted
        if (!isMounted) return;
        
        if (!ttsModule || !ttsModule.default) {
          console.warn('TTS module could not be loaded');
          return;
        }

        Tts = ttsModule.default;
        
        // Setup listeners
        Tts.addEventListener('tts-start', () => isMounted && setIsSpeaking(true));
        Tts.addEventListener('tts-finish', () => isMounted && setIsSpeaking(false));
        Tts.addEventListener('tts-cancel', () => isMounted && setIsSpeaking(false));
        Tts.addEventListener('tts-error', (error) => {
          console.error('TTS error:', error);
          isMounted && setIsSpeaking(false);
        });
        
        try {
          // Configure TTS
          await Tts.setDefaultLanguage(language);
          await Tts.setDefaultRate(0.5);
          await Tts.setDefaultPitch(1.0);
          
          if (isMounted) {
            setTtsAvailable(true);
            setIsReady(true);
            
            // Auto-play if enabled
            if (autoPlay && text) {
              setTimeout(() => {
                if (isMounted && Tts) {
                  speak(text, Tts);
                }
              }, 1000);
            }
          }
        } catch (initError) {
          console.error('TTS initialization error:', initError);
        }
      } catch (error) {
        console.error('Failed to initialize TTS:', error);
      }
    };

    setupTts();
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (Tts) {
        try {
          if (isSpeaking) {
            Tts.stop().catch(err => console.error('Error stopping TTS:', err));
          }
          Tts.removeAllListeners();
        } catch (error) {
          console.error('Error during TTS cleanup:', error);
        }
      }
    };
  }, [language, autoPlay, text]);

  const speak = async (textToSpeak, ttsInstance) => {
    if (!ttsInstance || !ttsAvailable) return;

    try {
      if (isSpeaking) {
        await ttsInstance.stop();
        setIsSpeaking(false);
      } else {
        await ttsInstance.speak(textToSpeak);
      }
    } catch (error) {
      console.error('TTS error when speaking:', error);
    }
  };

  // In Expo Go or web platforms, render a disabled button or nothing
  if (Platform.OS === 'web' || (global.expo && global.expo.modules)) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { opacity: 0.5 }]}
          disabled={true}
        >
          <Icons.VolumeX size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    );
  }

  // For native platforms
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // We'll attempt to dynamically import and use TTS when button is pressed
          import('react-native-tts').then(ttsModule => {
            if (ttsModule && ttsModule.default) {
              speak(text, ttsModule.default);
            }
          }).catch(error => {
            console.error('Failed to load TTS module:', error);
          });
        }}
        disabled={!ttsAvailable}
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
