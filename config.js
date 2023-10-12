// ./services/firebase.js
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyC1l_LKcxH3ZnvSGiJjSwv3UZHRhsPaX94",
    authDomain: "react-native-swap.firebaseapp.com",
    projectId: "react-native-swap",
    storageBucket: "react-native-swap.appspot.com",
    messagingSenderId: "1078249446661",
    appId: "1:1078249446661:web:c6ee5095ebfe86a058eb6c"
};

// initialize Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE  };