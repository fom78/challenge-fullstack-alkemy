import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// context
import { useAuth } from 'context/AuthContext'

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
      setError(error.message)
    }
  }

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value })

  return (

    <Container>
      {error && <p>{error}</p>}
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
          <button type='submit'>
            Register
          </button>
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
`

const Login = styled.p`
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
