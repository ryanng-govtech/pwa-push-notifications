import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

export const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBIy28NUtIKmH1MnnHQSnlJcxL1fR4vKMg",
        authDomain: "pwa-push-notifications-9bfd3.firebaseapp.com",
        projectId: "pwa-push-notifications-9bfd3",
        storageBucket: "pwa-push-notifications-9bfd3.appspot.com",
        messagingSenderId: "864174087947",
        appId: "1:864174087947:web:883b28dac90abf4fa8cc0e",
        measurementId: "G-6QMCG4K1LE"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
}

export const askForPermissionToReceiveNotifications = async () => {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyBIy28NUtIKmH1MnnHQSnlJcxL1fR4vKMg",
            authDomain: "pwa-push-notifications-9bfd3.firebaseapp.com",
            projectId: "pwa-push-notifications-9bfd3",
            storageBucket: "pwa-push-notifications-9bfd3.appspot.com",
            messagingSenderId: "864174087947",
            appId: "1:864174087947:web:883b28dac90abf4fa8cc0e",
            measurementId: "G-6QMCG4K1LE"
        };
        const firebaseApp = initializeApp(firebaseConfig);
        const messaging = getMessaging(firebaseApp);

        // await messagePermission.requestPermission();
        const getAccessToken = async (setTokenFound) => {
            try {
                const currentToken = await getToken(messaging, { vapidKey: 'BPcWsjpZWwWaMwWopL8MphD3aJnNhVAaocA54IN4uszewbRP_avsN7xCQMX_-Xcwp_54Tl8g0xtPQ8vJvE-af_4' });
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                    return currentToken;
                    // setTokenFound(true);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    setTokenFound(false);
                }
            } catch (err) {
                console.log('An error occurred while retrieving token. ', err);
            }
        }
        const token = await getAccessToken();
        console.log('Your token is:', token);
        const url = 'https://fcm.googleapis.com/fcm/send';

        // const body = {
        //     notification: {
        //         title: 'testing',
        //         body: 'Test push notification',
        //         click_action: 'http://localhost:3000/',
        //         icon: 'https://i.imgur.com/5zO5cce.png'
        //     },
        //     to: token
        // };


        const body = {
            "to": token,
            "notification": {
                "title": "Check this Mobile (title)",
                "body": "Rich Notification testing (body)",
                "mutable_content": true,
                "sound": "Tri-tone"
            },

            "data": {
                "url": "https://i.imgur.com/5zO5cce.png",
            }
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAyTTKHws:APA91bF7MIYXk98GRSsYoJSJmmWgO-5hZa9AbAbanq94YVQM3fM7z-x5dM0mZxB5IHp5YzzkS4drYn3EEPiBXab2nX7kivVRNVND97uwpK70Ir_mcgAXReyX2ulbJoa_r1_I9EgLx-T3'
        };

        try {
            console.log(JSON.stringify(body))
            console.log(headers);
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (response.ok) {
                // Notification sent successfully
                const result = await response.json();
                console.log(result)
                console.log('Push notification sent successfully');
            } else {
                // Handle error response
                console.error('Failed to send push notification:', response.status, response.statusText);
            }
        } catch (error) {
            // Handle network or other runtime errors
            console.error('Error while sending push notification:', error);
        }
        return token;
    } catch (error) {
        console.error(error);
    }
}