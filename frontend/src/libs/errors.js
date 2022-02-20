export function authErrors (errorCode) {
  let msg = ''
  if (errorCode === 'auth/wrong-password') {
    msg = 'Password incorrecto'
  }
  if (errorCode === 'auth/user-not-found') {
    msg = 'Usuario no encontrado.'
  }
  if (errorCode === 'auth/too-many-requests') {
    msg = 'Demasiados intento de login para esta cuenta, puede activarla reseteando el password.'
  }
  if (errorCode === 'auth/email-already-in-use') {
    msg = 'Email is in use, change please.'
  }
  return msg
}
