import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Replace with your Supabase URL and anon key
const supabaseUrl: string = 'https://ptjgsgnakgxnwxirdhsi.supabase.co';
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0amdzZ25ha2d4bnd4aXJkaHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjU1MDQsImV4cCI6MjA1NDE0MTUwNH0.eNlSK1bw4pqvxYC0ACUwYQXVsv8snqdRdCmphZ805Ns';

// Custom storage implementation for AsyncStorage
const customAsyncStorage = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customAsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
