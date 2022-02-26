import styled from 'styled-components'

const Error = ({ message = 'There\'s nothing here!' }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  )
}

export default Error

const Container = styled.main`
  font-size: 1rem;
  font-weight: 700;
  color: var(--red);
  padding: .5rem;
  border: 1px solid;
`
