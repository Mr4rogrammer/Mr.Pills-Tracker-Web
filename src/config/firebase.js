import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4i0rv3sTwDXwQuJjIfntQ9TXWB_wq7u4",
  authDomain: "mrpillstracker.firebaseapp.com",
  projectId: "mrpillstracker",
  storageBucket: "mrpillstracker.appspot.com",
  messagingSenderId: "473395054011",
  appId: "1:473395054011:web:39aa286cde5fa91a84b09e",
  measurementId: "G-E73K5E0HPH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()
const database = getDatabase(app)

export { auth, googleAuthProvider, database }