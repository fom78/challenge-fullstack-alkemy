import { Outlet, Link } from 'react-router-dom'
// Notify
import { ToastContainer } from 'react-toastify'
// Styles
import styled from 'styled-components'

export default function Layout () {
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
        <Link to='/home'>Home</Link> |{' '}
        <Link to='/list'>list</Link> |{' '}
        <Link to='/list/add'>Add</Link>
      </NavBar>
      <Main>
        <h1>Personal Finance</h1>
        <p>App to keep your numbers up to date</p>
        <Outlet />
      </Main>

      <StyledFooter>Footer</StyledFooter>
    </Container>
  )
}

export const Container = styled.div`
  padding: .8rem;
`
export const Main = styled.main`
/* height: calc(100vh - var(--footer-height) - 27px);
border: 1px solid red; */

`
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  border-bottom: solid 1px;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  background-color: var(--bg-primary);
  

  & > a {
    color: var(--text-primary);
    font-weight: bold;
  }
`

export const StyledFooter = styled.footer`
position: fixed;
bottom: 0;
width: 100%;
height: 38px;
display: flex;
display: none;
justify-content: space-between;
align-items: center;
padding: 0 25px;
background: rgba(1, 1, 1, 0.7);
color: hsla(0, 0%, 100%, 0.9);
font-size: 13px;
`
