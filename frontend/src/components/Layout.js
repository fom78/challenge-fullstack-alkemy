import ScrollToTop from 'components/ScrollToTop'
import { Outlet, Link } from 'react-router-dom'
// Notify
import { ToastContainer } from 'react-toastify'
// Styles
import styled from 'styled-components'

export default function Layout ({ user = null, login, logout }) {
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
          <Link to='/list'>list</Link> |{' '}
          <Link to='/list/add'>Add</Link> |{' '}
          <Link to='/about'>About</Link>
        </div>
        <div className='login'>
          {user ? <Link onClick={logout} to='/home'>Logout</Link> : <Link onClick={login} to='/home'>Login</Link>}
        </div>
      </NavBar>
      <Main>
        <h1>Personal Finance</h1>
        <h2>{user && user.name}</h2>
        <p>App to keep your numbers up to date</p>
        <Outlet />
      </Main>
      <ScrollToTop showButtonAt={250} />

      <StyledFooter>Footer</StyledFooter>
    </Container>
  )
}

export const Container = styled.div`
  padding: .8rem;
`
export const Main = styled.main`
  text-align:center;
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
  }
  & > .login {
    padding-right: 1rem;
    & > a {
      color: var(--text-primary);
      cursor: pointer;
    }
  }
`

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  display: none;
  height: 38px;
  width: 100%;
  padding: 0 25px;
  justify-content: space-between;
  color: hsla(0, 0, 100%, 0.9);
  font-size: 13px;
  align-items: center;
  background: rgba(1, 1, 1, 0.7);
`
