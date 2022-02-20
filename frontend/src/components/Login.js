import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// components
import Google from './icons/Google'
import Error from './Error'
// context
import { useAuth } from 'context/AuthContext'

export function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { login, loginWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/home')
    } catch (error) {
      let msg = ''
      if (error.code === 'auth/wrong-password') {
        msg = 'Password incorrecto'
      }
      if (error.code === 'auth/user-not-found') {
        msg = 'Usuario no encontrado.'
      }
      if (error.code === 'auth/too-many-requests') {
        msg = 'Demasiados intento de login para esta cuenta, puede activarla reseteando el password.'
      }
      setError(msg)
    }
  }

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value })

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate('/home')
    } catch (error) {
      setError(error.message)
    }
  }

  return (

    <Container>
      {error && <Error message={error} />}
      <h1 className='login'>Log in to your account</h1>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            placeholder='youremail@company.tld'
          />
        </div>
        <div className='row'>
          <label htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
            placeholder='*************'
          />
        </div>

        <div className='actions'>
          <button type='submit'>
            Sign In
          </button>
          <Link to='/reset-password'>
            Forgot Password?
          </Link>
        </div>
      </form>
      <button className='btn-google' onClick={handleGoogleSignin}>
        <Google width={40} height={40} />
        <div>
          <div>Log in with Google</div>
        </div>
      </button>
      <Register>
        Don't have an account?
        <Link to='/register' className='text-blue-700 hover:text-blue-900'>
          Register
        </Link>
      </Register>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
  background-color: var(--white);
  & >h1 { font-size: 1.3rem; }
  & > form {
    padding: 8px;
    margin-bottom: 6px;
    & .row {
      margin-bottom: 4px;
      & > label {
        display: block;
        font-size: 14px;
        font-weight: 700;
        color: var(--text-gray);
        text-align: left;
        margin-bottom: 2px;
      }
      & > input {
        width: 100%;
        appearance: none;
        border-width: 1px;
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 3px;
        padding-right: 3px;
        line-height: 1.25;
        color: var(--text-gray);
        &:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

        /* classNam focus:outline-none focus:shadow-outline' */

      }
    }
    & .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > button {
        background-color: #0066FF;
        color: var(--white);
        font-weight: 700;
        padding-left: 4px;
        padding-right: 4px;
        padding-top: 2px;
        padding-bottom: 2px;
        border-radius: 4px;
        &:hover {
          background-color: #007affb0;
        }
        &:focus {
          outline: 2px solid transparent;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }
      }
      & > a {
        display: inline-block;
        align-items: baseline;
        font-size: 14px;
        font-weight: 700;
        color: #0066FF;
        &:hover {
          text-decoration:none;
          color: #007affb0;
        }
      }
    }
  }
  & .btn-google {
    display: flex;
    flex-direction: row;
    height: 40px;
    padding: 0px 0px 0px 0px;
    border: 1px solid rgb(66, 133, 244);
    border-radius: 2px;
    width: 296px;
    box-sizing: content-box;
    cursor: pointer;
    & > svg {filter: brightness(0.95);}
    & > div {
      -webkit-box-flex: 1;
      flex-grow: 1;
      height: 40px;
      background-color: rgb(66, 133, 244);
      & > div {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: bold;
        /* font-family: Akzidenz; */
        line-height: 40px;
        height: 40px;
      }
    }
  }
    `
const Register = styled.p`
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
  & > a {
    color: blue;
    font-weight: 700;
  }
  & > a:hover {
    font-weight: 900;
  }

`
