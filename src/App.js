import { Outlet, Link } from "react-router-dom";
// Components
import Form from "components/Form";
import List from "components/List";
// Styles
import styled from 'styled-components'

function App() {
  return (
    <Container>
      <NavBar>
        <Link to="/home">Home</Link> |{" "}
        <Link to="/list">list</Link>
      </NavBar>
      <Main>
        <h1>Personal Finance</h1>
        <p>App to keep your numbers up to date</p>
        <Outlet />
      </Main>
      
      <StyledFooter>Footer</StyledFooter>
    </Container>
  );
}

export default App;

export const Container = styled.div`
  padding: .8rem;
`
export const Main = styled.main`
/* height: calc(100vh - var(--footer-height) - 27px);
border: 1px solid red; */

`
const NavBar = styled.nav`
  border-bottom: solid 1px;
  padding-bottom: 1rem;
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