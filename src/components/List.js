import { Outlet, useNavigate } from 'react-router-dom'
// Components
import Edit from './icons/Edit'
import Delete from './icons/Delete'
// Notify
import { toast } from 'react-toastify'
// Services
import FinanceService from 'services/finance.service'
// Styles
import styled from 'styled-components'

const List = ({ operations, setRefreshList, title = 'List of operations', actions = true }) => {
  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`/list/edit/${id}`)
  }
  const handleDelete = (id) => {
    FinanceService.delete(id)
      .then((response) => {
        setRefreshList(true)
        toast.success(`Operation id: ${id} deleted`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Outlet />
      <h2>{title}</h2>
      <ListStyled>
        {operations && operations.map(operation => {
          // Convert date to short date, format: d/mm/yy
          const date = new Date(operation.date)
          const formatedDate = new Intl.DateTimeFormat('es-AR', { year: '2-digit', month: '2-digit', day: 'numeric' }).format(date)
          const color = (operation.type === 'income') ? 'green' : 'red'
          return (
            <Operation key={operation.id}>
              <div className='operationHeader'>
                <div className='date'>{formatedDate}</div>
                <div className={`type ${color}`}>{operation.type}</div>
                {actions
                  ? (
                    <div className='btn-action'>
                      <button onClick={() => handleEdit(operation.id)}><Edit /></button>
                      <button><Delete onClick={() => handleDelete(operation.id)} /></button>
                    </div>)
                  : null}
              </div>
              <p className='operationConcept'>{operation.concept}</p>
              <div className='operationAmount'>Amount: <span>$ {operation.amount}</span></div>
            </Operation>
          )
        })}

      </ListStyled>
    </>
  )
}

export default List

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
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: .8rem;
  
  & .operationHeader {
    width: 100%;
    font-size: .7rem;
    padding-bottom: .5rem;
    display: flex;
    justify-content: space-between;

    & .type {
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

  & .btn-action > button {
    margin-right: .5rem;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    color: var(--white);
    
    &:hover {
      border: 1px solid var(--white);
    }    
  } 
`
