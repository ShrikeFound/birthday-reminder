import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCKKbdONGUJaLAcH0RVXknSGksbppoqVYc",
    authDomain: "birthday-reminder-2b6cb.firebaseapp.com",
    databaseURL: "https://birthday-reminder-2b6cb-default-rtdb.firebaseio.com",
    projectId: "birthday-reminder-2b6cb",
    storageBucket: "birthday-reminder-2b6cb.appspot.com",
    messagingSenderId: "1010930172421",
    appId: "1:1010930172421:web:4a390e0fb8b6a3f21d926c"
};
  
const app = firebase.initializeApp(firebaseConfig)
