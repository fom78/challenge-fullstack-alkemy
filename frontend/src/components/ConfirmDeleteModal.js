// Components
import Operation from './Operation'
// Styles
import styled from 'styled-components'

const ConfirmDeleteModal = ({
  changeState,
  handleDelete,
  operation,
  showOverlay,
  state
}) => {
  const handleDeleteClick = id => {
    handleDelete(id)
    changeState(false)
  }

  return (
    <>
      {state &&
        <Overlay showOverlay={showOverlay}>
          <ModalContainer>
            <CloseButton type='button' onClick={() => changeState(false)}>
              <span aria-hidden='true'>×</span>
            </CloseButton>
            <ModalHeader>
              <h5>Confirm delete operation</h5>
            </ModalHeader>

            <ModalBody>
              <Operation operation={operation} bgTransparent />
              <DeleteButton onClick={() => handleDeleteClick(operation.id)}>Delete !</DeleteButton>
            </ModalBody>

          </ModalContainer>
        </Overlay>}
    </>
  )
}

export default ConfirmDeleteModal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 0;
  background: ${props => props.showOverlay ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
  align-items: ${props => props.posicionModal ? props.posicionModal : 'center'};
  justify-content: center;
`
const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  background-clip: padding-box;
  border: 2px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 50%);
  outline: 0;
  background-color: var(--bg-primary);
  border: 2px solid var(--red);
  pointer-events: auto;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  justify-content: space-around;
  background: hsla(0, 0%, 49%, .1);
  border: none;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
  h5 {
    margin: 0;
    color: var(--white);
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
  }
`
const ModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: .25rem .5rem;
  overflow-y: auto;
  min-height: 190px;
  background: var(--bg-primary);
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, .2);
  align-items: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 1000;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--white);
  background-color: transparent;
  background-image: none;
  transition: .15s ease-in-out;
  opacity: .5;
  cursor: pointer;
  &:hover {
    color: #000;
    opacity: 1;
  }
`

const DeleteButton = styled.button`
  padding: .3rem;
  width: 100%;
  border-radius: 1rem;
  border: none;
  align-self: flex-end;
  font-size: 1rem;
  font-weight: 400;
  color: var(--white);
  line-height: 1.5;
  background-color: var(--red);
  transition-duration: .3s;
  text-transform: uppercase;
  cursor: pointer;
`
