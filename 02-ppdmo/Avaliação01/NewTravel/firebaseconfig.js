import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_YFFQE3s7SkHUdifrWpd0L2LIGLwcYTs",
    authDomain: "livroslidos-dda8b.firebaseapp.com",
    projectId: "livroslidos-dda8b",
    storageBucket: "livroslidos-dda8b.appspot.com",
    messagingSenderId: "713994695413",
    appId: "1:713994695413:web:8d4e22ed64ff4f9d7b4bbc"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
export const storage = getStorage(app);

  export {db, auth};