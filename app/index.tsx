// import { usePushNotifications } from '@/hooks/usePushNotification';
import { router } from 'expo-router';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import GoogleButton from '@/src/googleSign';
// import OneSignal from 'react-native-onesignal';
// import { LogLevel, OneSignal } from 'react-native-onesignal';

const ONE_SIGNAL_APP_ID = '67a4ecd2-3d93-4d46-9722-1fc789c7c0c1';
const OnboardScreen = () => {
  // const { expoPushToken, notification } = usePushNotifications();
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // OneSignal.initialize('');
  // // Also need enable notifications to complete OneSignal setup
  // OneSignal.Notifications.requestPermission(true);
  return (
    <View style={styles.containr}>
      <GoogleButton />
    </View>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  containr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightpink',
  },
});
