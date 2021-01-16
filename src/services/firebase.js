import firebase from "firebase/app";
import "firebase/storage";

export const firebaseInit = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyDq_9JOhDi0q8t_jqIvV9cZGAYd23X2p_4",
        authDomain: "store-project-7b26b.firebaseapp.com",
        databaseURL: "https://store-project-7b26b.firebaseio.com",
        projectId: "store-project-7b26b",
        storageBucket: "store-project-7b26b.appspot.com",
        messagingSenderId: "357501876805",
        appId: "1:357501876805:web:10bb67ee36a95fae4d012c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log('firebase initialized!')
}