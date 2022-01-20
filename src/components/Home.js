import styled from 'styled-components'
// Components
import List from "./List";

import { getBalance, getOperations } from 'data';

export default function Home({operations}) {
    const balance = getBalance()
    const lastOperations = getOperations({quantity:3})
    return (
      <HomeStyled>
        <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
        <List operations={lastOperations} title='Last operations'/>
      </HomeStyled>
    );
  }

const HomeStyled = styled.section`
  background-color: var(--white);
  & >h1 {
    font-size: 1.3rem
  }
`