/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");

// eslint-disable-next-line linebreak-style
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://birthday-reminder-2b6cb-default-rtdb.firebaseio.com",
});




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const { sendReminder } = require("./src/fcm");
exports.sendReminder = sendReminder;

