import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// Components
import Operation from './Operation'
// Styles
import styled from 'styled-components'

const List = ({ operations, setRefreshList, title = 'List of operations', actions = true }) => {
  const [operationsToShow, setOperationsToShow] = useState([...operations])

  const handleChange = e => {
    showOper(e.target.value, operations)
  }

  const showOper = (show = 'all') => {
    if (show === 'all') {
      setOperationsToShow([...operations])
    } else {
      const filteredOperations = operations.filter(operation => {
        return operation.type === show
      })
      setOperationsToShow([...filteredOperations])
    }
  }

  useEffect(() => {
    setOperationsToShow([...operations])
  }, [operations])

  return (
    <>
      <Outlet />
      <h2>{title}</h2>
      <div>
        <label htmlFor='type-form'>Type</label>
        <select id='type-form' onChange={handleChange} name='type'>
          <option value='all'>All</option>
          <option value='income'>Income</option>
          <option value='expenditure'>Expenditure</option>
        </select>
      </div>
      <ListStyled>
        {operationsToShow && operationsToShow.map(operation => {
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
