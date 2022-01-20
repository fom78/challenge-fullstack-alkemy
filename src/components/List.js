import styled from 'styled-components'

import { getOperations } from 'data';

const List = ({quantity='all', title = 'List of operations'}) => {
  
    const operations = getOperations({quantity})
    return (
        <>
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
  padding-bottom: 1.5rem;
  background-color: var(--white);
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