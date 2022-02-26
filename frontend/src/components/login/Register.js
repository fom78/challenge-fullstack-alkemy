import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// components
import Error from '../Error'
// context
import { useAuth } from 'context/AuthContext'
// libs
import { authErrors } from 'libs/errors'
// styles
import { Button, Login, Container } from './styles'

export function Register () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/home')
    } catch (error) {
      const msg = authErrors(error.code)
      setError(msg)
    }
  }

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value })

  return (

    <Container>
      {error && <Error message={error} />}
      <h1 className='login'>Register with e-mail</h1>

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
            Register
          </Button>
        </div>
      </form>
      <Login>
        Already have an Account?
        <Link to='/login'>
          Login
        </Link>
      </Login>
    </Container>
  )
}
