import styled from 'styled-components'

import { getBalance, getOperations } from 'data';

const List = ({quantity=5, title = 'List of operations'}) => {
  const balance = getBalance()
  console.log(balance);
    const operations = getOperations({quantity})
    return (
        <>
            <h1>Actual Balance: $ {parseFloat(balance).toFixed(2)}</h1>
            <h2>{title}</h2>
            <ListStyled>
                
                {operations.map(operation => <Operation key={operation.id}>
                    <div className='operationHeader'>
                      <div>{operation.date}</div>
                      <div>{operation.type}</div>
                      <div>Edit-Delete</div>
                    </div>
                    <p className='operationConcept'>{operation.concept}</p>
                    <div className='operationAmount'>Amount: <span>$ {operation.amount}</span></div>
                </Operation>)

                }
            </ListStyled>
        </>
    )
}

export default List;

export const ListStyled = styled.div`
  margin-bottom: 0.5rem;
  background-color: var(--white);


${(props) => props.showFull && 'height: 200px;'}
`

const Operation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  max-width: 100%;
  margin: 1rem;
  /* align-items: center; */
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: .8rem;
  border: 2px solid var(--dark);
  
  & .operationHeader {
    width: 100%;
    font-size: .7rem;
    padding-bottom: .5rem;
    display: flex;
    justify-content: space-between;
  }

  & .operationConcept {
    color: var(--text-primary);
    padding-left: 1rem;
  }

  & .operationAmount {
    position: relative;
    top: 1rem;
    padding-left: .5rem ;
  }

  & .operationAmount > span {
    font-weight: bold;
  }
`