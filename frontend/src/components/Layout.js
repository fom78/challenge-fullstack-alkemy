import { Outlet, Link, useNavigate } from 'react-router-dom'
// components
import ScrollToTop from 'components/ScrollToTop'
import Conf from './icons/Conf'
// context
import { useAuth } from 'context/AuthContext'
// Notify
import { ToastContainer } from 'react-toastify'
// Styles
import styled from 'styled-components'

export default function Layout () {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const addOperation = () => {
    navigate('/add')
  }

  return (
    <Container>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar>
        <div className='menues'>
          <Link to='/home'>Home</Link> |{' '}
          {user &&
            <>
              <Link to='/list'>List</Link> |{' '}
              <Link to='/add' onClick={addOperation}>Add</Link> |{' '}
            </>}
          <Link to='/about'>About</Link>
        </div>
        <div className='login'>
          {user ? <>{user.rol === 'admin' ? <Link className='rol-admin' onClick={logout} to='/home'><Conf /></Link> : ''}<Link onClick={logout} to='/home'>Logout</Link></> : <Link to='/login'>Login</Link>}
        </div>
      </NavBar>
      <Main>
        <h1>Personal Finance</h1>
        {user &&
          <div className='user'>
            <div>
              <h2>{user.name !== '' ? user.name : user.userName}</h2>
              <span className='rol'>{user.rol}</span>
            </div>
            <img className='avatar' src={user.avatar ? user.avatar : 'avatar.png'} />
          </div>}
        <p>App to keep your numbers up to date</p>
        <Outlet />
      </Main>
      <ScrollToTop showButtonAt={250} />

    </Container>
  )
}

export const Container = styled.div`
  padding: .8rem;
`
export const Main = styled.main`
  /* text-align:center; */
  & .user {
    display: flex;
    justify-content: center;
    align-content: center;
    & > div > h2 {
      padding-bottom: 0;
      padding-right: 5px;
      margin-bottom: 0;
    }
    & > div > span.rol {
      padding-top: 0;
      padding-left: 4px;
      padding-right: 4px;
      margin-top: 0;
      text-align: left;
      background-color: var(--green);
    }    
  }
  & .avatar {
    width: 40px;
    height: 40px;
    align-self: center;
  }
`
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  border-bottom: solid 1px;
  background-color: var(--bg-primary);
  & .menues > a {
    color: var(--text-primary);
    font-weight: bold;
    & .active {
        color: red;
        font-size: 18px;
    }
    &:hover {
      box-shadow: inset 0 -2px 0 var(--dark);
      opacity: 0.8;
    }
  }
  & > .login {
    padding-right: 1rem;
    & > a {
      color: var(--text-primary);
      cursor: pointer;
    }
    & > a.rol-admin {
      padding-top: 0;
      padding-left: 4px;
      padding-right: 4px;
      margin-top: 0;
      text-align: left;
      & > svg {
        vertical-align: middle;
      }
    }
  }
`
