import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// components
import Google from '../icons/Google'
import Error from '../Error'
// context
import { useAuth } from 'context/AuthContext'
// libs
import { authErrors } from 'libs/errors'
// styles
import { Button, Register, Container } from './styles'

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
      const msg = authErrors(error.code)
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
          <Button type='submit' blue>
            Sign In
          </Button>
          <Link to='/reset-password'>
            Forgot Password?
          </Link>
        </div>
      </form>
      <Register>
        Don't have an account?
        <Link to='/register' className='text-blue-700 hover:text-blue-900'>
          Register
        </Link>
      </Register>
      <p>Social Networks</p>
      <button className='btn-google' onClick={handleGoogleSignin}>
        <Google width={40} height={40} />
        <div>
          <div>Log in with Google</div>
        </div>
      </button>
    </Container>
  )
}
