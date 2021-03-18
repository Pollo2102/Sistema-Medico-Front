import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBlYrS7i04GtqD-OGlUqiFDtfhn8_-yH6M",
  authDomain: "sis-med-front-cbd8e.firebaseapp.com",
  projectId: "sis-med-front-cbd8e",
  storageBucket: "sis-med-front-cbd8e.appspot.com",
  messagingSenderId: "680678637294",
  appId: "1:680678637294:web:719cb7f6b9a2d7e6a5bdff",
  measurementId: "G-3Q8PZSDDZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
