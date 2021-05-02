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


  const getNextBirthday = (birthdayObj) => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const nextMonth = birthdayObj.birthmonth
    const nextDay = birthdayObj.birthday
  let nextBDay = new Date();
  if (todayMonth < nextMonth) {
      nextBDay = new Date(today.getFullYear(),birthdayObj.birthmonth,birthdayObj.birthday)
    } else if (todayMonth === nextMonth && todayDay <= nextDay) {
    nextBDay = new Date(today.getFullYear(), birthdayObj.birthmonth, birthdayObj.birthday)
    } else {
    nextBDay = new Date(today.getFullYear()+1, birthdayObj.birthmonth, birthdayObj.birthday)
    }
    
    return nextBDay
  }










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
      console.log(`===========${b.name}===========`)
      console.log("next birthday date: ",getNextBirthday(b).getTime()," | ",typeof getNextBirthday(b).getTime())
      console.log("today's date: ",currentDate.getTime()," | ",typeof currentDate.getTime())
      const daysTill = (getNextBirthday(b) - currentDate.getTime()) / ( 1000 * 2600 * 24) 
      console.log(daysTill, daysTill <= 14)
      return (daysTill <= 14) 
    })
    console.log(birthdaysThisMonth.length)
    if (birthdaysThisMonth.length >= 1) {
      usersToBeMessaged.push(user)
    } else {
      // console.log("no birthdays this month.")
    }
  }

  console.log(`results (${usersToBeMessaged.length}): `,usersToBeMessaged)
  if (usersToBeMessaged <= 0) return false;
  const message = {
    notification: {
      title: "Upcoming Birthdays!",
      body: "You have birthdays coming up within the next 2 weeks!"
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


  const removedPromises = failedTokens.map(token => db.ref(`/fcm_tokens/${token}`).remove())





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
  return Promise.all(removedPromises).catch(err => err.message)
});
