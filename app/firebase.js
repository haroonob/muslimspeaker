import * as firebase from 'firebase';

// firebase.initializeApp({
//     apiKey: "AIzaSyBym0CamN4s6OxyK_ci38A4nQJxC5i9sPw",
//     authDomain: "react-native-examples.firebaseapp.com",
//     databaseURL: "https://react-native-examples.firebaseio.com",
//     storageBucket: "react-native-examples.appspot.com",
//     messagingSenderId: "768069939096"
// });

// export const firebaseRef = firebase.database().ref();
// export default firebase;

let HAS_INITIALIZED = false

const initFirebase = () => {
    if (!HAS_INITIALIZED) {
        const config = {
              apiKey: "AIzaSyBym0CamN4s6OxyK_ci38A4nQJxC5i9sPw",
                authDomain: "react-native-examples.firebaseapp.com",
                databaseURL: "https://react-native-examples.firebaseio.com",
                storageBucket: "react-native-examples.appspot.com",
                messagingSenderId: "768069939096"
        }

        firebase.database.enableLogging(false)
        firebase.initializeApp(config)
        HAS_INITIALIZED = true
    }
}

export const getDatabase = () => {
    initFirebase()
  
    return firebase.database()

}