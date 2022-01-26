import { useEffect, useState } from 'react'
// firebase
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}
const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_APPID
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const userSignIn = result.user
        const normalizedUser = userSignIn ? mapUserFromFirebaseAuthToUser(userSignIn, token) : null

        setUser(normalizedUser)
        console.log('user....', userSignIn)

        return { userSignIn, token }
      // ...
      }).catch((error) => {
        console.log(error.message, error.code)
      })
  }

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.')
      setUser(USER_STATES.NOT_LOGGED)
    }).catch((error) => {
      // An error happened.
      console.log(error)
    })
  }
  const mapUserFromFirebaseAuthToUser = (user, token) => {
    const { email, photoURL, uid, displayName } = user
    const name = (displayName) || ''
    return {
      avatar: photoURL,
      userName: email,
      name,
      token,
      uid
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
        console.log(normalizedUser)
        setUser(normalizedUser)
      }
    })
  }, [])

  return { user, setUser, login, logout }
}
