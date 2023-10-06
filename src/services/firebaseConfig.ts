import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-F7px_-mRSGaIvESXbLjITXYHjfLiJTM",
    authDomain: "livecampus-7d100.firebaseapp.com",
    databaseURL: "https://livecampus-7d100-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "livecampus-7d100",
    storageBucket: "livecampus-7d100.appspot.com",
    messagingSenderId: "566217321321",
    appId: "1:566217321321:web:9fc325a265fcf69b1cebf8",
    measurementId: "G-X98RZY8GVN"
};

if (!initializeApp().apps.length) {
    initializeApp(firebaseConfig);
}

export const Auth = auth();
export const Db = firestore();