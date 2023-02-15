
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPxt4q8qWRojTLWhP0W7iqDsyM1KpZSW4",
    authDomain: "ht-playground-ab9e1.firebaseapp.com",
    projectId: "ht-playground-ab9e1",
    storageBucket: "ht-playground-ab9e1.appspot.com",
    messagingSenderId: "363921436084",
    appId: "1:363921436084:web:cb0b4180c9246a4fe756e1",
    measurementId: "G-Y0K53QPDJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getInstances() {
    const data = await getDocs(collection(db, "instance"));
    return data.docs.map((doc) => {
        return {uid: doc.id, ...doc.data()}
    });
}
export async function addInstance(){
    // Add a new document in collection "cities"
    await setDoc(doc(db, "instance", "LA" ), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    });
}