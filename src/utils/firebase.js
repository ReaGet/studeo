/* eslint-disable */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCYs3REfSoqual_OtfwU816FAuHCOLlQNM',
  authDomain: 'studeo-8a254.firebaseapp.com',
  projectId: 'studeo-8a254',
  storageBucket: 'studeo-8a254.appspot.com',
  messagingSenderId: '930405552835',
  appId: '1:930405552835:web:5f011727b1a866be408876',
  databaseURL:
    'https://studeo-8a254-default-rtdb.europe-west1.firebasedatabase.app/',
});

const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
