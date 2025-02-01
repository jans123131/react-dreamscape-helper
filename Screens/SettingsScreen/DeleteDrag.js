import React, { useRef, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAGGABLE_HEIGHT = SCREEN_HEIGHT * 0.38;

const DeleteDrag = ({ onClose }) => {
  const translateY = useRef(new Animated.Value(DRAGGABLE_HEIGHT)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = Math.max(
          0,
          Math.min(gestureState.dy + translateY._value, DRAGGABLE_HEIGHT)
        );
        translateY.setValue(newTranslateY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        const snapThreshold = DRAGGABLE_HEIGHT / 4;

        let targetPosition;
        if (dy > snapThreshold) {
          targetPosition = DRAGGABLE_HEIGHT;
          onClose();
        } else {
          targetPosition = 0;
        }

        Animated.spring(translateY, {
          toValue: targetPosition,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.draggableContent,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handleBar} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.description}>
            Are you sure you want to delete your account? This action cannot be undone.
          </Text>
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmText}>Confirm Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999998,
    elevation: 999998,
  },
  draggableContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: DRAGGABLE_HEIGHT,
    backgroundColor: '#ffffff',
    zIndex: 999999,
    elevation: 999999,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  confirmButton: {
    width: '80%',
    backgroundColor: '#893571',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#893571',
    fontWeight: 'bold',
  },
});

export default DeleteDrag;
