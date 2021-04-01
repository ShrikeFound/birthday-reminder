import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import { Message } from 'rsuite';

const firebaseConfig = {
    apiKey: "AIzaSyCKKbdONGUJaLAcH0RVXknSGksbppoqVYc",
    authDomain: "birthday-reminder-2b6cb.firebaseapp.com",
    databaseURL: "https://birthday-reminder-2b6cb-default-rtdb.firebaseio.com",
    projectId: "birthday-reminder-2b6cb",
    storageBucket: "birthday-reminder-2b6cb.appspot.com",
    messagingSenderId: "1010930172421",
    appId: "1:1010930172421:web:4a390e0fb8b6a3f21d926c"
};
  
const app                = firebase.initializeApp(firebaseConfig)
export const auth        = app.auth();
export const db          = app.database();
export const messaging = firebase.messaging.isSupported() ? app.messaging() : null;

if (messaging) {
  messaging.usePublicVapidKey('BAUR5uBetoeWt4rRBMGU290cLKi-91cZQYlIrrQapxWIM8QvDmHHBa5TZxHjGAQwo_vG_yyyAdnYP-yrHmY4764');

  messaging.onMessage((data) => {
    console.log(data)
  })


}

