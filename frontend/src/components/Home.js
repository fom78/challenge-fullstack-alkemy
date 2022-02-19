import { useMemo } from 'react'
import styled from 'styled-components'
// Components
import Google from './icons/Google'
import List from './List'
import Spinner from './Spinner'
// context
import { useAuth } from 'context/AuthContext'
// hooks
import useOperations from 'hooks/useOperations'

export default function Home () {
  const { login, user } = useAuth()
  const { operations, isLoading } = useOperations(user)

  const balance = useMemo(() => operations.reduce((previousValue, currentValue) => {
    if (currentValue.type === 'expenditure') return previousValue - currentValue.amount
    return previousValue + currentValue.amount
  }, 0), [operations])

  if (isLoading) return (<Spinner />)

  return (
    <HomeStyled>
      {user
        ? (
          <>
            <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
            <List
              title='Last operations added'
              showFilters={false}
              quantity={2}
            />
          </>)
        : (
          <>
            <h1 className='login'>Log in to your account</h1>
            <button type='button' className='btn-google' onClick={login}>
              <Google width={40} height={40} />
              <div>
                <div>Log in with Google</div>
              </div>
            </button>
          </>
          )}
    </HomeStyled>
  )
}

const HomeStyled = styled.section`
  background-color: var(--white);
  & >h1 { font-size: 1.3rem; }
  & .login { text-align: left;}
  & .btn-google {
    display: flex;
    flex-direction: row;
    height: 40px;
    padding: 0px 2px 0px 0px;
    border: 1px solid rgb(66, 133, 244);
    border-radius: 2px;
    width: 296px;
    box-sizing: content-box;
    cursor: pointer;
    & > svg {filter: brightness(0.95);}
    & > div {
      -webkit-box-flex: 1;
      flex-grow: 1;
      height: 40px;
      background-color: rgb(66, 133, 244);
      & > div {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: bold;
        /* font-family: Akzidenz; */
        line-height: 40px;
        height: 40px;
      }
    }
  }
`
