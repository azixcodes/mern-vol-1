import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBohaiIQg8HuofYaGuSEHxZErk_cLrC7lI",
  authDomain: "instant-chat-406506.firebaseapp.com",
  projectId: "instant-chat-406506",
  storageBucket: "instant-chat-406506.appspot.com",
  messagingSenderId: "1092823693085",
  appId: "1:1092823693085:web:0de382a3550be7d3f313f4",
  measurementId: "G-M17CKR3QH2",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const closeSignInWithGooglePopup = () =>close
