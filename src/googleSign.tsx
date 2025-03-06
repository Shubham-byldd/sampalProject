import React, { useEffect } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { supabase } from './supabaseClient';

// ✅ Configure Google Sign-In once (outside the component)
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '848560664299-nukdq508p94ia0fjituev3c90tko5mac.apps.googleusercontent.com',
  iosClientId:
    '848560664299-fiq8eblagj6vq3kedclhkpkjvs48uu73.apps.googleusercontent.com',
});

export default function GoogleButton() {
  useEffect(() => {
    // ✅ Ensure Play Services are available
    const checkPlayServices = async () => {
      try {
        await GoogleSignin.hasPlayServices();
      } catch (error) {
        console.error('Play Services error:', error);
      }
    };
    checkPlayServices();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available

      const userInfo: any = await GoogleSignin.signIn(); // ✅ Get user info
      console.log('User Info:', userInfo);

      const idToken = userInfo?.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token present!');
      }

      // ✅ Send Google ID token to Supabase
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) throw error;

      console.log('Supabase Auth Success:', data);
      Alert.alert('Success', 'Signed in successfully!');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Unknown error occurred:', error.message);
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleGoogleSignIn}
    />
  );
}
