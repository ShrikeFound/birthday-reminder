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
const messaging = admin.messaging();



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// const { sendReminder } = require("./src/fcm");
// exports.sendReminder = sendReminder;

exports.timerUpdate = functions.pubsub.schedule("*/2 * * * *").onRun(async (context) => {
  const ref = await db.ref("fcm_tokens").once("value");
  if (!ref.exists) return false;
  const users = ref.val();
  // const usersToBeNotified = []
  const usersToBeMessaged = []
  for (const user in users) {
    console.log(`user : ${user}: ${users[user]}`)
    const birthdays = await db.ref(`birthdays/${users[user]}`).once("value")
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth();

    //if there is a birthday for this month
    const birthdaysThisMonth = Object.values(birthdays.val()).filter((b) => {
      return b.birthmonth === currentMonth
    })
    console.log(birthdaysThisMonth.length)
    if (birthdaysThisMonth.length >= 1) {
      usersToBeMessaged.push(user)
    } else {
      // console.log("no birthdays this month.")
    }
  }

  console.log(`results (${usersToBeMessaged.length}): `,usersToBeMessaged)

  const message = {
    notification: {
      title: "Upcoming Birthdays!",
      body: "You have birthdays coming up this month!"
    },
    tokens: usersToBeMessaged
  }


  const messageResponse = await messaging.sendMulticast(message)
  const failedTokens = [];
  
  if (messageResponse.failureCount > 0) {
    messageResponse.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(usersToBeMessaged[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
  } else {
    console.log("no message failures!");
    }

  // const userArray = Object.values(users);
  // //for each user, get their birthdays
  // userArray.forEach(async user => {
  //   console.log(user)
  //   const birthdays = await db.ref(`birthdays/${user}`).once("value")
  //   if (birthdays.exists) {
  //     console.log("Birthdays: ", birthdays.val())
  //   }
  // })
  //if there is a birthday for this month
  //keep the name and...
  //do stuff

  console.log("scheduled function complete.")
  return true
});
