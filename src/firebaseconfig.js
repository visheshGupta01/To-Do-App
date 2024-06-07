import { initializeApp } from "firebase/app";
import { getAuth,setPersistence,browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP85AOAOQgZ5Q04MovAU539Wc9vmUD63M",
  authDomain: "todo-app-82c79.firebaseapp.com",
  projectId: "todo-app-82c79",
  storageBucket: "todo-app-82c79.appspot.com",
  messagingSenderId: "1092260152487",
  appId: "1:1092260152487:web:455f581b5dfedf66f48782",
  measurementId: "G-0C1NSCDGKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)

export default app;
