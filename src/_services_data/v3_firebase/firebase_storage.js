//works. V9 modular

import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getBlob,getStorage, uploadBytes, ref,uploadBytesResumable,getDownloadURL  } from "@firebase/storage";

const FirebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}
const app = initializeApp(FirebaseConfig);
//export const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);


export {
    db,
    storage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
    getBlob
}

/*export const db = getFirestore(app);
export const storage = getStorage(app);
export { ref }
console.log("sssssssssss", storage)*/


/*import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const app = initializeApp(
    
    {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId
      }

)

const projectAuth = getAuth(app)
const storage = getFirestore(app)

console.log(storage)
export { projectAuth, storage }

*/








/*import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };*/