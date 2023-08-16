import { initializeApp } from "firebase/app";
import {getAuth,GithubAuthProvider,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
apiKey: "AIzaSyBMdwcqrut0DTw9TvvId1pAL1Edf_kVtoo",
  authDomain: "fir-auth-db-a2d85.firebaseapp.com",
  projectId: "fir-auth-db-a2d85",
  storageBucket: "fir-auth-db-a2d85.appspot.com",
  messagingSenderId: "728467973217",
  appId: "1:728467973217:web:bb997b1aeab73d953f7620",
  measurementId: "G-E3HS2FWNK8"
  };
  export const app = initializeApp(firebaseConfig);
  export const auth=getAuth(app);
  export const googleProvider=new GoogleAuthProvider();
  export const githubProvider=new GithubAuthProvider();
  export const db=getFirestore(app)
