import { createApp } from 'vue'
import App from './App.vue'
import firebase from "firebase/app";
import router from './routers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

/**
 * FIREBASE
 * For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
 */
const firebaseConfig = {
    apiKey: "AIzaSyCEfiwv8DltHDab5n78CcRRL_UIzM9id6o",
    authDomain: "truckmanifest-ba0a5.firebaseapp.com",
    databaseURL: "https://truckmanifest-ba0a5-default-rtdb.firebaseio.com",
    projectId: "truckmanifest-ba0a5",
    storageBucket: "truckmanifest-ba0a5.appspot.com",
    messagingSenderId: "594820744642",
    appId: "1:594820744642:web:36b3d483bf792dbb00425b",
    measurementId: "G-WRXFQGGH0X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if (location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  console.log("local");
  firebase.database().useEmulator("localhost", 8082);
}
app.config.globalProperties.$firebase = firebase;


library.add(faGlobe, faChevronLeft, faChevronRight);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');
