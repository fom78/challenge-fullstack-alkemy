import styled from 'styled-components'
// Components
import List from "./List";

import { getBalance } from 'data';

export default function Home() {
    const balance = getBalance()

    return (
      <main>
        <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
        <List quantity={3} />
      </main>
    );
  }