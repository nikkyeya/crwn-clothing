import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAU9IiNXGo4cCoEzjAg08Z-knaEdZcv350',
  authDomain: 'crwn-db-f1dbf.firebaseapp.com',
  projectId: 'crwn-db-f1dbf',
  storageBucket: 'crwn-db-f1dbf.appspot.com',
  messagingSenderId: '506474374238',
  appId: '1:506474374238:web:41d69663de7b122fb900cf',
  measurementId: 'G-B44YPBMBDH',
}

// Save logged in user to firebase db
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  console.log('Snapshot', snapShot)

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
