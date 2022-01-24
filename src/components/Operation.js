import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import ConfirmDeleteModal from './ConfirmDeleteModal'
import Edit from './icons/Edit'
import Delete from './icons/Delete'
import Spinner from './Spinner'
// Notify
import { toast } from 'react-toastify'
// Services
import FinanceService from 'services/finance.service'
// Styles
import styled from 'styled-components'

const Operation = ({ operation, actions, setRefreshList, bgTransparent = false }) => {
  const [stateModal, setStateModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  // Convert date to short date, format: d/mm/yy
  const date = new Date(operation.date)
  const formatedDate = new Intl.DateTimeFormat('es-AR', { year: '2-digit', month: '2-digit', day: 'numeric' }).format(date)
  const color = (operation.type === 'income') ? 'green' : 'red'

  const handleEdit = (id) => {
    navigate(`/list/edit/${id}`)
  }

  const handleDelete = (id) => {
    setIsDeleting(true)
    FinanceService.delete(id)
      .then((response) => {
        setRefreshList(true)
        toast.success(`Operation id: ${id} deleted`, {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setIsDeleting(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  if (isDeleting) {
    return <Spinner />
  }

  return (
    <OperationStyled key={operation.id}>
      <div className='operationHeader'>
        <div className='date'>{formatedDate}</div>
        <div className={`type ${color}`}>{operation.type}</div>
        {actions
          ? (
            <div className='btn-action'>
              <button onClick={() => handleEdit(operation.id)}><Edit /></button>
              <button><Delete onClick={() => setStateModal(!stateModal)} /></button>
            </div>)
          : null}
      </div>
      <p className='operationConcept'>{operation.concept}</p>
      <div className='operationAmount'>Amount: <span>$ {operation.amount}</span></div>

      <ConfirmDeleteModal
        state={stateModal}
        changeState={setStateModal}
        handleDelete={() => handleDelete(operation.id)}
        handleEdit={() => handleEdit(operation.id)}
        operation={operation}
        showOverlay
      />
    </OperationStyled>
  )
}

export default Operation

const OperationStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  max-width: 100%;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.3rem;
  ${(props) => (props.bgTransparent) ? 'background-color: transparent;' : 'background-color: var(--bg-primary);'}
  /* background-color: var(--bg-primary);
  background-color: transparent; */
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
