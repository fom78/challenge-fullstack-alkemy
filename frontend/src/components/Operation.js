import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import ConfirmDeleteModal from './ConfirmDeleteModal'
import Edit from './icons/Edit'
import Delete from './icons/Delete'
import Spinner from './Spinner'
// context
import { useAuth } from 'context/AuthContext'
// Notify
import { toast } from 'react-toastify'
// Services
import OperationsService from 'services/operations.service'
// Styles
import styled from 'styled-components'

const Operation = ({ operation, actions, bgTransparent = false }) => {
  const { user } = useAuth()
  const [stateModal, setStateModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  // Convert date to short date, format: d/mm/yy
  const date = new Date(operation.date)
  const formatedDate = new Intl.DateTimeFormat('es-AR', { year: '2-digit', month: '2-digit', day: 'numeric' }).format(date)
  const color = (operation.type === 'income') ? 'green' : 'red'

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleDelete = (id, token) => {
    setIsDeleting(true)
    OperationsService.delete(id, token)
      .then((response) => {
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
    <OperationStyled key={operation.id} bgTransparent={bgTransparent}>
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
      <div className='footer'>
        <p className='operationAmount'>Amount: <span>$ {operation.amount}</span></p>
        <p className='operationCategory'>Category: <span>{operation.category.name}</span></p>
      </div>

      <ConfirmDeleteModal
        state={stateModal}
        changeState={setStateModal}
        handleDelete={() => handleDelete(operation.id, user.token)}
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
  font-size: .8rem;
  color: var(--text-primary);
  ${(props) => props.bgTransparent ? 'background-color: transparent;' : 'background-color: var(--bg-primary);'}
  
  & .operationHeader {
    display: flex;
    width: 100%;
    padding-bottom: .5rem;
    font-size: .7rem;
    justify-content: space-between;

    & .type {
      margin:auto;
      padding: 4px;
      text-transform: uppercase;
    }
    & .green {border: 2px solid var(--green);}
    & .red {border: 2px solid var(--red);}
  }

  & .operationConcept {
    color: var(--text-primary);
    padding-left: 1rem;
  }

  & .footer {
    display: flex;
    justify-content: space-between;
  }
  & .operationAmount {
    margin-bottom: .5rem ;
    font-size: .7rem;
    & > span {
      font-size: .9rem;
      font-weight: bold;
    }
  }
  & .operationCategory {
    font-size: .6rem;
    & > span {
      font-size: .9rem;
      font-weight: bold;
    }
  }
  & .btn-action > button {
    margin-right: .5rem;
    color: var(--white);
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    
    &:hover { border: 1px solid var(--white); }    
  } 
`
