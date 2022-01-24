import { Outlet } from 'react-router-dom'
// Components
import Operation from './Operation'
// Styles
import styled from 'styled-components'

const List = ({ operations, setRefreshList, title = 'List of operations', actions = true }) => {
  return (
    <>
      <Outlet />
      <h2>{title}</h2>
      <ListStyled>
        {operations && operations.map(operation => {
          return (
            <Operation
              key={operation.id}
              operation={operation}
              actions={actions}
              setRefreshList={setRefreshList}
            />
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
