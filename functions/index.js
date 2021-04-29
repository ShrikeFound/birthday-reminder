/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-multiple-empty-lines */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://birthday-reminder-2b6cb-default-rtdb.firebaseio.com",
});

const db = admin.database()




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// const { sendReminder } = require("./src/fcm");
// exports.sendReminder = sendReminder;

exports.timerUpdate = functions.pubsub.schedule("*/5 * * * *").onRun(async (context) => {
  const ref = await db.ref("fcm_tokens").once("value");
  if (!ref.exists) return false;
  const users = ref.val();

  const userArray = Object.values(users);
  //for each user, get their birthdays
  //if there is a birthday for this month
  //keep the name and...
  //do stuff

  console.log("user array: ",userArray)
  return true
});
