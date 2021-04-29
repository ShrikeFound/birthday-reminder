/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.database();

exports.sendReminder = functions.https.onCall(async (data, context) => {
  checkIfAuth(context);
  
  const { userId, message } = data

  const userSnapshot = await db.ref(`/users/${userId}`).once('value')


})



const checkIfAuth = (context) =>{
  if (!context.auth) {
    throw new functions.https.HttpsError("'unauthenticated','you have to be signed in.'");
  }
}
