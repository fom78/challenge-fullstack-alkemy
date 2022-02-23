// contexts
import { useAuth } from 'context/AuthContext'
// hooks
import useOperations from 'hooks/useOperations'
// styles
import styled from 'styled-components'

export default function Admin () {
  const { user } = useAuth()
  const { categories } = useOperations(user)
  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <h2>Categories</h2>
      {categories.map(category =>
        <div key={category.id}>
          <span>{category.name}</span>
        </div>)}
    </Container>
  )
}

const Container = styled.section`
  background-color: var(--white);
  & >h1 { font-size: 1.3rem }
  & .link {color: var(--red)}
`
