import React, { useState } from 'react';
import { Text, StyleSheet, View, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useClerk } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { signOut } = useClerk();
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <View style={styles.footer}>
        <Button
          mode="outlined"
          icon="logout"
          style={styles.logoutButton}
          labelStyle={styles.logoutText}
          onPress={() => setLogoutModalVisible(true)}
        >
          {t('Logout.logout')}
        </Button>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('Logout.confirmation')}</Text>
            <View style={styles.modalActions}>
              <Button
                onPress={handleLogout}
                style={styles.modalButton}
                textColor="white"
              >
                {t('Logout.yes')}
              </Button>
              <Button
                mode="text"
                onPress={() => setLogoutModalVisible(false)}
                style={styles.modalButtonCancel}
                textColor="#673AB7"
              >
                {t('Logout.cancel')}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#893571',
    backgroundColor: '#893571',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    width: '45%',
    backgroundColor: '#893571',
    borderRadius: 10,
  },
  modalButtonCancel: {
    width: '45%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
});

export default Logout;