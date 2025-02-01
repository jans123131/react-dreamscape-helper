import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useTranslation } from 'react-i18next';

const QuickActions = () => {
  const navigation = useNavigation(); // Acc
  // ess navigation object
  const { t } = useTranslation();
  return (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('DonateScreen')} // Navigate to DonateScreen
      >
        <MaterialCommunityIcons name="food-apple" size={24} color="#893571" />
        <Text style={styles.actionText}>{t('QuickActions.Donate')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('NgoFindScreen')} // Navigate to NgoScreen
      >
        <MaterialCommunityIcons name="map-marker" size={24} color="#893571" />
        <Text style={styles.actionText}>{t('QuickActions.FindNGOs')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('MyHistoryScreen')} // Navigate to MyHistoryScreen
      >
        <MaterialCommunityIcons name="history" size={24} color="#893571" />
        <Text style={styles.actionText}>{t('QuickActions.History')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});

export default QuickActions;
