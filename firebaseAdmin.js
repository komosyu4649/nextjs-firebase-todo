const admin = require("firebase-admin");
const serviceAccount = require("./secrets.json");

export const vertifyIdToken = (token) => {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }
    return admin.auth().vertifyIdToken(token).catch(err=>{throw err;})
}