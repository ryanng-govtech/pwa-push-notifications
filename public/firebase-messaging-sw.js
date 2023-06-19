importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBIy28NUtIKmH1MnnHQSnlJcxL1fR4vKMg",
    authDomain: "pwa-push-notifications-9bfd3.firebaseapp.com",
    projectId: "pwa-push-notifications-9bfd3",
    storageBucket: "pwa-push-notifications-9bfd3.appspot.com",
    messagingSenderId: "864174087947",
    appId: "1:864174087947:web:883b28dac90abf4fa8cc0e",
    measurementId: "G-6QMCG4K1LE"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});