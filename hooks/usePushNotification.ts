// import { useEffect, useState, useRef, useCallback } from 'react';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Alert, Platform } from 'react-native';
// import Constants from 'expo-constants';
// import { EventSubscription } from 'expo-modules-core';

// export function usePushNotifications() {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
//   const [notification, setNotification] =
//     useState<Notifications.Notification | null>(null);
//   const badgeCount = useRef(0);

//   const notificationListener = useRef<EventSubscription | null>(null);
//   const responseListener = useRef<EventSubscription | null>(null);

//   // Function to register push notifications
//   const registerForPushNotifications = useCallback(async (): Promise<
//     string | null
//   > => {
//     if (!Device.isDevice) {
//       Alert.alert(
//         'Push Notifications',
//         'Must use a physical device for push notifications',
//       );
//       return null;
//     }

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     const finalStatus =
//       existingStatus === 'granted'
//         ? existingStatus
//         : (await Notifications.requestPermissionsAsync()).status;

//     if (finalStatus !== 'granted') {
//       Alert.alert(
//         'Push Notifications',
//         'Permission not granted for push notifications',
//       );
//       return null;
//     }

//     const projectId =
//       Constants.expoConfig?.extra?.eas?.projectId ||
//       Constants.manifest2?.extra?.eas?.projectId;

//     const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
//       .data;
//     const extractedToken = token.match(/\[(.*?)\]/)?.[1] || token;

//     console.log('Expo Push Token:', extractedToken);
//     setExpoPushToken(extractedToken);

//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('default', {
//         name: 'Default Channel',
//         importance: Notifications.AndroidImportance.MAX,
//         sound: 'default',
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }

//     return extractedToken;
//   }, []);

//   useEffect(() => {
//     registerForPushNotifications();

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener(notification => {
//         setNotification(notification);
//         badgeCount.current += 1;
//         Notifications.setBadgeCountAsync(badgeCount.current);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(response => {
//         console.log('User interacted with notification:', response);
//         badgeCount.current = 0;
//         Notifications.setBadgeCountAsync(0);
//       });

//     return () => {
//       notificationListener.current?.remove();
//       responseListener.current?.remove();
//     };
//   }, [registerForPushNotifications]);

//   useEffect(() => {
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }, []);

//   return { expoPushToken, notification };
// }

// import { useEffect, useState, useCallback } from 'react';
// import OneSignal from 'react-native-onesignal';
// import { Alert, Platform } from 'react-native';

// // Type definitions
// interface NotificationChannelConfig {
//   id: string;
//   name: string;
//   description?: string;
//   importance?: number;
//   vibration?: boolean;
// }

// interface UseOneSignalNotifications {
//   playerId: string | null;
//   notification: OneSignal.OSNotification | null;
//   hasPermission: boolean | null;
//   checkPermissions: () => Promise<void>;
//   setNotificationChannel: (config: NotificationChannelConfig) => void;
//   sendTag: (key: string, value: string) => Promise<void>;
// }

// export function useOneSignalNotifications(): UseOneSignalNotifications {
//   const [playerId, setPlayerId] = useState<string | null>(null);
//   const [notification, setNotification] =
//     useState<OneSignal.OSNotification | null>(null);
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);

//   // Memoized channel creation
//   // const setNotificationChannel = useCallback(
//   //   (config: {
//   //     id: string;
//   //     name: string;
//   //     description?: string;
//   //     importance?: number;
//   //     vibration?: boolean;
//   //   }) => {
//   //     if (Platform.OS === 'android') {
//   //       OneSignal.createNotificationChannel(
//   //         config.id, // Channel ID
//   //         config.name, // Channel Name
//   //         config.importance ?? 5, // Importance Level (1-5)
//   //         config.description, // Description (Optional)
//   //         { vibrate: config.vibration ?? true }, // Vibration settings
//   //       );
//   //     }
//   //   },
//   //   [],
//   // );

//   // Permission handling
//   const checkPermissions = useCallback(async () => {
//     try {
//       const status = await OneSignal.Notifications.canRequestPermission();
//       setHasPermission(status);
//       return status;
//     } catch (error) {
//       console.error('Permission check error:', error);
//       return false;
//     }
//   }, []);

//   // Initialize OneSignal
//   useEffect(() => {
//     if (!Platform.isNative) {
//       Alert.alert('Push Notifications', 'Physical device required');
//       return;
//     }

//     // Initialize SDK
//     OneSignal.setAppId('YOUR_ONESIGNAL_APP_ID');
//     OneSignal.setLogLevel(OneSignal.LogLevel.Verbose, OneSignal.LogLevel.None);

//     // Setup listeners
//     const foregroundSubscription = OneSignal.Notifications.addEventListener(
//       'foregroundWillDisplay',
//       (event: OneSignal.NotificationWillDisplayEvent) => {
//         const notification = event.getNotification();
//         setNotification(notification);
//         event.preventDefault();
//         event.display(notification);
//       },
//     );

//     const clickSubscription = OneSignal.Notifications.addEventListener(
//       'click',
//       (event: OneSignal.NotificationClickEvent) => {
//         setNotification(event.notification);
//       },
//     );

//     // Get initial state
//     const initialize = async () => {
//       try {
//         // Get user ID
//         const deviceState = await OneSignal.getDeviceState();
//         if (deviceState?.userId) {
//           setPlayerId(deviceState.userId);
//         }

//         // Check permissions
//         const hasPermission = await OneSignal.Notifications.hasPermission();
//         setHasPermission(hasPermission);

//         // Android channel setup
//         if (Platform.OS === 'android') {
//           setNotificationChannel({
//             id: 'default',
//             name: 'Default Channel',
//             importance: 5,
//           });
//         }
//       } catch (error) {
//         console.error('Initialization error:', error);
//       }
//     };

//     initialize();

//     // Cleanup
//     return () => {
//       foregroundSubscription.remove();
//       clickSubscription.remove();
//     };
//   }, [setNotificationChannel]);

//   // Tag management
//   const sendTag = useCallback(async (key: string, value: string) => {
//     try {
//       await OneSignal.User.addTag(key, value);
//     } catch (error) {
//       console.error('Tag error:', error);
//     }
//   }, []);

//   return {
//     playerId,
//     notification,
//     hasPermission,
//     checkPermissions,
//     setNotificationChannel,
//     sendTag,
//   };
// }

// import { useEffect, useState, useCallback } from 'react';
// import OneSignal, {
//   OSNotification,
//   NotificationWillDisplayEvent,
//   NotificationClickEvent,
// } from 'react-native-onesignal';
// import { Alert, Platform } from 'react-native';

// // Type definitions
// interface NotificationChannelConfig {
//   id: string;
//   name: string;
//   description?: string;
//   importance?: number;
//   vibration?: boolean;
// }

// interface UseOneSignalNotifications {
//   playerId: string | null;
//   notification: OSNotification | null;
//   hasPermission: boolean | null;
//   checkPermissions: () => Promise<boolean>;
//   setNotificationChannel: (config: NotificationChannelConfig) => void;
//   sendTag: (key: string, value: string) => Promise<void>;
// }

// export function useOneSignalNotifications(): UseOneSignalNotifications {
//   const [playerId, setPlayerId] = useState<string | null>(null);
//   const [notification, setNotification] = useState<OSNotification | null>(null);
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);

//   // Notification channel setup (Android only)
//   const setNotificationChannel = useCallback(
//     (config: NotificationChannelConfig) => {
//       if (Platform.OS === 'android') {
//         OneSignal.setNotificationChannel(config.id, {
//           channelId: config.id,
//           channelName: config.name,
//           channelDescription: config.description,
//           importance: config.importance || 5,
//           vibration: config.vibration ?? true,
//         });
//       }
//     },
//     [],
//   );

//   // Permission check
//   const checkPermissions = useCallback(async () => {
//     try {
//       const status = await OneSignal.getDeviceState();
//       const hasPerm = status?.hasNotificationPermission ?? false;
//       setHasPermission(hasPerm);
//       return hasPerm;
//     } catch (error) {
//       console.error('Permission check error:', error);
//       return false;
//     }
//   }, []);

//   // Initialize OneSignal
//   useEffect(() => {
//     if (!Device.isDevice) {
//       Alert.alert('Push Notifications', 'Physical device required');
//       return;
//     }

//     // Initialize SDK
//     OneSignal.setAppId('YOUR_ONESIGNAL_APP_ID');
//     OneSignal.setLogLevel(OneSignal.LogLevel.Verbose, OneSignal.LogLevel.None);

//     // Setup listeners
//     const handleNotificationWillDisplay = (
//       event: NotificationWillDisplayEvent,
//     ) => {
//       setNotification(event.notification);
//     };

//     const handleNotificationClick = (event: NotificationClickEvent) => {
//       setNotification(event.notification);
//     };

//     OneSignal.addForegroundWillDisplayListener(handleNotificationWillDisplay);
//     OneSignal.addClickListener(handleNotificationClick);

//     // Initial setup
//     const initialize = async () => {
//       try {
//         const deviceState = await OneSignal.getDeviceState();
//         setPlayerId(deviceState?.userId || null);
//         await checkPermissions();

//         if (Platform.OS === 'android') {
//           setNotificationChannel({
//             id: 'default',
//             name: 'Default Channel',
//             importance: 5,
//           });
//         }
//       } catch (error) {
//         console.error('Initialization error:', error);
//       }
//     };

//     initialize();

//     // Cleanup
//     return () => {
//       OneSignal.clearForegroundWillDisplayListeners();
//       OneSignal.clearClickListeners();
//     };
//   }, [checkPermissions, setNotificationChannel]);

//   // Tag management
//   const sendTag = useCallback(async (key: string, value: string) => {
//     try {
//       await OneSignal.User.addTag(key, value);
//     } catch (error) {
//       console.error('Tag error:', error);
//     }
//   }, []);

//   return {
//     playerId,
//     notification,
//     hasPermission,
//     checkPermissions,
//     setNotificationChannel,
//     sendTag,
//   };
// }
