import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const FooterNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('HomeScreen');
  const { t } = useTranslation();

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  const TabButton = ({ label, icon, screen, isCenter = false }) => {
    const isActive = activeTab === screen;

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withSpring(isActive ? 1.2 : 1),
          },
        ],
      };
    });

    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          isActive && styles.activeTabButton,
          isCenter && styles.centerButton,
        ]}
        onPress={() => {
          setActiveTab(screen);
          navigation.navigate(screen);
        }}
      >
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          {isCenter ? (
            <View style={styles.centerButtonInner}>
              <Icon name={icon} size={30} color="white" />
            </View>
          ) : (
            <>
              <Icon
                name={icon}
                size={24}
                color={isActive ? '#893571' : '#8E8E93'}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {label}
              </Text>
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <TabButton
          label={t('Footer.Home')}
          icon="home-outline"
          screen="HomeScreen"
        />
        <TabButton
          label={t('Footer.Community')}
          icon="people-outline"
          screen="CommunityScreen"
        />
        <TabButton
          label=""
          icon="map-outline"
          screen="MapScreen"
          isCenter={true}
        />
        <TabButton
          label={t('Footer.Store')}
          icon="storefront"
          screen="StoreScreen"
        />
        <TabButton
          label={t('Footer.Profile')}
          icon="person-outline"
          screen="SettingsScreen"
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: 'transparent',
  },
  centerButton: {
    justifyContent: 'flex-start',
    marginTop: -18,
    
  },
  centerButtonInner: {
    backgroundColor: '#893571',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#893571',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#893571',
    fontWeight: '600',
  },
});

export default FooterNavigator;
