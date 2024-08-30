import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBuSz4oCmWfta15uLFgbdDUuFaN8Ovo4F4",
  authDomain: "pets-6fa49.firebaseapp.com",
  projectId: "pets-6fa49",
  storageBucket: "pets-6fa49.appspot.com",
  messagingSenderId: "320737702525",
  appId: "1:320737702525:web:ca3ec225aa75e87d147714"
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);
  export const storage = getStorage(app);

  export {db, auth};