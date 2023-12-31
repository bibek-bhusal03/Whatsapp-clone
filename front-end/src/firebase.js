import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider }  from 'firebase/auth';



const firebaseApp =  initializeApp({
  apiKey: "AIzaSyDMsI9F7hgrlHFayg55EIXCGRULmrrP_7M",
  authDomain: "whatsapp-mod-a7b2d.firebaseapp.com",
  projectId: "whatsapp-mod-a7b2d",
  storageBucket: "whatsapp-mod-a7b2d.appspot.com",
  messagingSenderId: "1057282523862",
  appId: "1:1057282523862:web:16938b176a5e0a7d863f77"
});


const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { auth, provider};
