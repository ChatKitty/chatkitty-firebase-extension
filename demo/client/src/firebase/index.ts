import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export const firebaseApp = initializeApp({
    projectId: "demo-project-id",
    apiKey: "demo-api-key",
})


const auth = getAuth();
const firestore = getFirestore();

connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "localhost", 8080);
