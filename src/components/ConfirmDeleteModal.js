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
              <DeleteButton onClick={() => handleDeleteClick(operation.id)}>Delete !</DeleteButton>
            </ModalBody>

          </ModalContainer>
        </Overlay>}
    </>
  )
}

export default ConfirmDeleteModal

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${props => props.showOverlay ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
  padding: 0;
  display: flex;
  align-items: ${props => props.posicionModal ? props.posicionModal : 'center'};
  justify-content: center;
`
const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  pointer-events: auto;
  background-clip: padding-box;
  border: 2px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 50%);
  outline: 0;
  background-color: var(--bg-primary);
  border: 2px solid var(--red);
`

const ModalHeader = styled.div`
  justify-content: space-around;
  padding: 1rem;
  background: hsla(0, 0%, 49%, .1);
  border: none;
  display: flex;
  align-items: flex-start;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
  h5 {
    color: var(--white);
    text-align: center;
    text-transform: uppercase;
    margin: 0;
  }
`
const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: .25rem .5rem;
  min-height: 160px;
  background: var(--bg-primary);
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, .2);
  overflow-y: auto;
  display: flex;
  align-items: center;
`

const CloseButton = styled.button`
  color: rgba(0, 0, 0, .6);
  opacity: .5;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  transition: .15s ease-in-out;
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 1000;
  color: var(--white);
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  &:hover {
    color: #000!important;
    opacity: 1!important;
  }
`

const DeleteButton = styled.button`
  padding: .3rem;
  border-radius: 1rem;
  border: none;
  transition-duration: .3s;
  font-size: 1rem;
  line-height: 1.5;
  background-color: var(--red);
  color: var(--white);
  width: 100%;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  align-self: flex-end;
`
