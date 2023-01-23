import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDdgYQWJE34LSHfxRpc2CqTfH3TWNP6Gjs',
	authDomain: 'netxflix-clone.firebaseapp.com',
	projectId: 'netxflix-clone',
	storageBucket: 'netxflix-clone.appspot.com',
	messagingSenderId: '454669005213',
	appId: '1:454669005213:web:c0bceb9b07cf11af8ebf74',
	measurementId: 'G-HRXJEWTYH7',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
