//import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebase } from '@firebase/app'


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
   // fb_config
   apiKey: process.env.apiKey,
   authDomain: process.env.authDomain,
   //databaseURL:  //"https://evernote-clone-33d81.firebaseio.com", not sure what this is 
   projectId: process.env.projectId,
   storageBucket: process.env.storageBucket,
   messagingSenderId: process.env.messagingSenderId,
   appId: process.env.appId,
   measurementId: process.env.measurementId
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);