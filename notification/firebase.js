import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyArFnM-u1weAX7a2uwqfmqYwQDZawtehO0",
  authDomain: "pushnotificationbbg.firebaseapp.com",
  projectId: "pushnotificationbbg",
  storageBucket: "pushnotificationbbg.firebasestorage.app",
  messagingSenderId: "937456883532",
  appId: "1:937456883532:web:2b504b446af1bac514a1e9",
  measurementId: "G-KEVZBJ6HWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log('Permission status:', permission);
   
const token = await getToken(messaging, {vapidKey: 'BLCFiPhG8F4ALDusDhSCMkycI9miECzl0-mDu_LSgdbWek766mu8jRKU411KpSjwhR3sz-2kayG24o15CXbafkk',});
console.log('Token:', token);
} 
export default generateToken;