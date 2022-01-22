import { Outlet } from "react-router-dom";
// Styles
import styled from 'styled-components'


const List = ({ operations, title = 'List of operations' }) => {
    
  return (
    <>
      <Outlet />
      <h2>{title}</h2>
      <ListStyled>
        {operations && operations.map(operation => 
          {
            // Convert date to short date, format: d/mm/yy
            const date = new Date(operation.date)
            const formatedDate = new Intl.DateTimeFormat('es-AR', { year: '2-digit', month: '2-digit', day: 'numeric' }).format(date)
            const color = (operation.type==='income')?'green':'red'
            console.log(color);
            return <Operation key={operation.id}>
              <div className='operationHeader'>
                <div className='date'>{formatedDate}</div>
                <div className={`type ${color}`}>{operation.type}</div>
                {console.log(operation.type)}
                <div>
                  <button>Edit</button><button>Delete</button></div>
              </div>
              <p className='operationConcept'>{operation.concept}</p>
              <div className='operationAmount'>Amount: <span>$ {operation.amount}</span></div>
            </Operation>})

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
  height: 120px;
  max-width: 100%;
  margin-bottom: 1rem;
  padding: 0.3rem;
  /* align-items: center; */
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: .8rem;
  border: 4px solid var(--green);
  
  & .operationHeader {
    width: 100%;
    font-size: .7rem;
    padding-bottom: .5rem;
    display: flex;
    justify-content: space-between;

    & .type {
      /* background-color: red; */
      /* color: red; */
      /* border: 2px solid red; */
      text-transform: uppercase;
      margin:auto;
      padding: 4px;
    }
    & .green {border: 2px solid var(--green);}
    & .red {border: 2px solid var(--red);}

  }

  & .operationConcept {
    color: var(--text-primary);
    padding-left: 1rem;
  }

  & .operationAmount {
    margin-bottom: .5rem ;
    & > span {
    font-weight: bold;
  }
  }

  
`