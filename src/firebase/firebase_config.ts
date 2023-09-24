import { config } from "@/envs/env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = config["FIREBASE_CONFIG"];
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth();
export default auth;
