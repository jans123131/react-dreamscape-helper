import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function StartScreen({ navigation }) {
  const [activeStep, setActiveStep] = useState(0);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const steps = [
    {
      title: "Share With Love",
      description: "Join a community that believes in sharing meals and spreading joy",
      image: "https://i.ibb.co/qCdLqjH/Rx-Gdei-K5wfg-KIog-IM0-D0-Tc-GLp7-I2-0dc0259a-3a7f-475e-9330-6922da13ce14.jpg"
    },
    {
      title: "Make an Impact",
      description: "Every meal shared is a step towards reducing food waste",
      image: "https://i.ibb.co/1zG7TQK/kids-cooking-children-chesf-cartoon-character-335657-177-removebg-preview.png"
    },
    {
      title: "Connect & Care",
      description: "Build meaningful connections through the power of food sharing",
      image: "https://i.ibb.co/931rN5G/tourists-checking-into-hotel-room-webpage-74855-2546.jpg"
    }
  ];

  const animateSlide = (nextStep) => {
    setActiveStep(nextStep);
    Animated.spring(slideAnim, {
      toValue: nextStep,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#fef6fa']}
        style={styles.gradient}
      >
        <View style={styles.slideContainer}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.slide,
                {
                  transform: [{
                    translateX: slideAnim.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH]
                    })
                  }]
                }
              ]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: step.image }}
                  style={styles.stepImage}
                />
              </View>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.description}>{step.description}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={styles.dotsContainer}>
          {steps.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => animateSlide(index)}
              style={styles.dotWrapper}
            >
              <View
                style={[
                  styles.dot,
                  activeStep === index ? styles.activeDot : null
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {activeStep < steps.length - 1 ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => animateSlide(activeStep + 1)}
            >
              <LinearGradient
  colors={['#b8658f', '#a55580']}
  style={styles.gradientButton}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
>
  <Text style={styles.buttonText}>Continue</Text>
</LinearGradient>

            </TouchableOpacity>
          ) : (
            <View style={styles.finalButtons}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <LinearGradient
                  colors={['#b8658f', '#a55580']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                ><Text style={styles.buttonText}>Start</Text></LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradient: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    position: 'relative',
  },
  slide: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 30,
    top: 60,
  },
  imageContainer: {
    marginBottom: 40,
    shadowColor: '#b8658f',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  stepImage: {
    width: 325,
    height: 310,
    borderRadius: 20,
  },
  imageShadow: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'rgba(184, 101, 143, 0.1)',
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 17,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dotWrapper: {
    padding: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#b8658f',
    width: 24,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  gradientButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButton: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#b8658f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  finalButtons: {
    gap: 12,
  },
  loginButton: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#b8658f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#b8658f',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
  registerButtonText: {
    color: '#b8658f',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
});
