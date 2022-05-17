const admin = require("firebase-admin");

const serviceAccount = require("./mensajes-d4edd-firebase-adminsdk-sx1af-14596b4190.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('DB conected');

const db = admin.firestore();

module.exports = db