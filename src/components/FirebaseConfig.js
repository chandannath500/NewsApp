import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBz5u0WwfFTwLMmMbSmWvbD25SP7_vZR64",
    authDomain: "newsapp-fed8c.firebaseapp.com",
    projectId: "newsapp-fed8c",
    storageBucket: "newsapp-fed8c.appspot.com",
    messagingSenderId: "328243638791",
    appId: "1:328243638791:web:1d53ccae2555a326ddf0a2",
    measurementId: "G-B69RLWZ6Q3"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
