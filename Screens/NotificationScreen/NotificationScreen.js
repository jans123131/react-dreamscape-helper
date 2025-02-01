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

const notifications = [
  {
    id: '1',
    message: 'Meal ordered successfully.',
    description: 'Your order #12345 has been confirmed',
    icon: 'fastfood',
    color: '#2ECC71',
    time: '10 mins ago',
  },
  {
    id: '2',
    message: 'Meal canceled.',
    description: 'Order #12344 has been canceled',
    icon: 'cancel',
    color: '#FF5733',
    time: '20 mins ago',
  },
  {
    id: '3',
    message: 'Product approved!',
    description: 'Your listing has been verified and published',
    icon: 'check-circle',
    color: '#2ECC71',
    time: '1 hour ago',
  },
  {
    id: '4',
    message: 'Order is out for delivery.',
    description: 'Your order #12343 is on the way',
    icon: 'local-shipping',
    color: '#FF8C00',
    time: '2 hours ago',
  },
];

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      
      </View>

      {/* Notification Count */}
      <View style={styles.notificationSummary}>
        <Text style={styles.summaryText}>
          You have {notifications.length} notifications
        </Text>
      </View>

      {/* Notifications List */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id} 
            style={[
              styles.notificationCard,
              notification.color === '#2ECC71' && styles.successCard,
              notification.color === '#FF5733' && styles.cancelCard,
              notification.color === '#FF8C00' && styles.warningCard,
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
              <MaterialIcons
                name={notification.icon}
                size={24}
                color={notification.color}
                style={styles.notificationIcon}
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.messageText}>{notification.message}</Text>
              <Text style={styles.descriptionText}>{notification.description}</Text>
              <Text style={styles.timeText}>{notification.time}</Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color="#CCCCCC"
              style={styles.chevronIcon} 
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDE7F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#893571',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationSummary: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 4,
  },
  successCard: {
    borderLeftColor: '#2ECC71',
  },
  cancelCard: {
    borderLeftColor: '#FF5733',
  },
  warningCard: {
    borderLeftColor: '#FF8C00',
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
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
  chevronIcon: {
    marginLeft: 8,
  },
});

export default NotificationScreen;
