import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

const notifications = [
  {
    id: '1',
    message: 'Donation Accepted',
    description: 'John Smith will pick up your donation today at 2 PM',
    icon: 'check-circle',
    type: 'success',
    time: '10 mins ago',
  },
  {
    id: '2',
    message: 'Donation Request Declined',
    description: 'Your food donation request has been declined due to quality concerns',
    icon: 'cancel',
    type: 'error',
    time: '20 mins ago',
  },
  {
    id: '3',
    message: 'New Donations Available',
    description: '20 new food items have been added in your area',
    icon: 'local-dining',
    type: 'info',
    time: '1 hour ago',
  },
  {
    id: '4',
    message: 'Delivery Update',
    description: 'Your donation is on the way to the recipient',
    icon: 'local-shipping',
    type: 'info',
    time: '2 hours ago',
  },
];

const getNotificationStyle = (type) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: 'rgba(137, 53, 113, 0.05)',
        iconColor: '#893571',
      };
    case 'error':
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        iconColor: '#EF4444',
      };
    default:
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        iconColor: '#3B82F6',
      };
  }
};

const NotificationScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#893571', '#b8658f']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('Notifications.title')}</Text>
      </LinearGradient>

      <View style={styles.notificationSummary}>
        <Text style={styles.summaryText}>
          {t('Notifications.summary', { count: notifications.length })}
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => {
          const style = getNotificationStyle(notification.type);
          return (
            <TouchableOpacity 
              key={notification.id} 
              style={[styles.notificationCard, { backgroundColor: style.backgroundColor }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${style.iconColor}10` }]}>
                <MaterialIcons
                  name={notification.icon}
                  size={24}
                  color={style.iconColor}
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.messageText}>{notification.message}</Text>
                <Text style={styles.descriptionText}>{notification.description}</Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  notificationSummary: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  scrollContainer: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
});

export default NotificationScreen;