import styled from 'styled-components'
// Components
import List from "./List";

import { getBalance } from 'data';

export default function Home() {
    const balance = getBalance()

    return (
      <HomeStyled>
        <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
        <List quantity={3} title='Last operations'/>
      </HomeStyled>
    );
  }

const HomeStyled = styled.section`
  background-color: var(--white);
  & >h1 {
    font-size: 1.3rem
  }
`