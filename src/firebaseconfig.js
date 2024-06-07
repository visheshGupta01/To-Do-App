import { initializeApp } from "firebase/app";
import { getAuth,setPersistence,browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgnkkLUmrW_aeYMEJiV53cCp4RzdOrcnI",
  authDomain: "todo-app-85307.firebaseapp.com",
  projectId: "todo-app-85307",
  storageBucket: "todo-app-85307.appspot.com",
  messagingSenderId: "442139363753",
  appId: "1:442139363753:web:b9f853feebad6343095cb8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)

export default app;
