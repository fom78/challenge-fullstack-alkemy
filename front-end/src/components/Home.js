import { useMemo } from 'react'
import styled from 'styled-components'
// Components
import List from './List'

export default function Home ({ operations, quantity = 10 }) {
  const lastOperations = operations.sort((a, b) => b.id - a.id).slice(0, quantity)

  const balance = useMemo(() => operations.reduce((previousValue, currentValue) => {
    if (currentValue.type === 'expenditure') return previousValue - currentValue.amount
    return previousValue + currentValue.amount
  }, 0), [operations])

  return (
    <HomeStyled>
      <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
      <List operations={lastOperations} title='Last operations added' />
    </HomeStyled>
  )
}

const HomeStyled = styled.section`
  background-color: var(--white);
  & >h1 {
    font-size: 1.3rem
  }
`
