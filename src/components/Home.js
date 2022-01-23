import styled from 'styled-components'
// Components
import List from './List'

import { getOperations } from 'data'
import { useMemo } from 'react'

export default function Home ({ operations }) {
  const lastOperations = getOperations({ op: operations, quantity: 3 })

  const balance = useMemo(() => operations.reduce((previousValue, currentValue) => {
    if (currentValue.type === 'expenditure') return previousValue - currentValue.amount
    return previousValue + currentValue.amount
  }, 0), [operations])

  return (
    <HomeStyled>
      <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
      <List operations={lastOperations} title='Last operations' actions={false} />
    </HomeStyled>
  )
}

const HomeStyled = styled.section`
  background-color: var(--white);
  & >h1 {
    font-size: 1.3rem
  }
`
