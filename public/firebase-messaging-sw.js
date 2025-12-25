// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyArFnM-u1weAX7a2uwqfmqYwQDZawtehO0",
    authDomain: "pushnotificationbbg.firebaseapp.com",
    projectId: "pushnotificationbbg",
    storageBucket: "pushnotificationbbg.firebasestorage.app",
    messagingSenderId: "937456883532",
    appId: "1:937456883532:web:2b504b446af1bac514a1e9",
    measurementId: "G-KEVZBJ6HWR"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});