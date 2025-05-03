// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyClWWpxuqyAmkzrftRcQBt2cSvhuVrWd9U',
  authDomain: 'namesuggestor-b3eaa.firebaseapp.com',
  databaseURL: 'https://namesuggestor-b3eaa-default-rtdb.firebaseio.com',
  projectId: 'namesuggestor-b3eaa',
  storageBucket: 'namesuggestor-b3eaa.firebasestorage.app',
  messagingSenderId: '1086720261550',
  appId: '1:1086720261550:web:874b6a56d6fc9f706f5c3f',
  measurementId: 'G-51N7E5QNDE',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
