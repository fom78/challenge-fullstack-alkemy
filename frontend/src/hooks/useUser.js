import { useEffect, useState } from 'react'
// firebase
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

import AuthService from 'services/auth.service'

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
        const token = credential.idToken
        // The signed-in user info.
        const userSignIn = result.user
        const normalizedUser = userSignIn ? mapUserFromFirebaseAuthToUser(userSignIn, token) : null

        AuthService.create(normalizedUser, token)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(normalizedUser))
            setUser(normalizedUser)
          })
          .catch((e) => {
            console.log(e)
          })

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
      localStorage.setItem('user', JSON.stringify(USER_STATES.NOT_LOGGED))
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
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))
    if (userLocalStorage) { setUser(userLocalStorage) }
  }, [])

  return { user, setUser, login, logout }
}
