// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwLC6MnNKHXySAzDS9JLzCjVpcWG01AA8",
  authDomain: "expencetracker-90de3.firebaseapp.com",
  projectId: "expencetracker-90de3",
  storageBucket: "expencetracker-90de3.appspot.com",
  messagingSenderId: "837747107124",
  appId: "1:837747107124:web:b2d4f29ba68b97d18cf161",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
