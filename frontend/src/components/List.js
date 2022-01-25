import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// Components
import Operation from './Operation'
// Styles
import styled from 'styled-components'

const List = ({ categories, operations, setRefreshList, showFilters = true, title = 'List of operations', actions = true }) => {
  const [operationsToShow, setOperationsToShow] = useState([...operations])
  const [filter, setFilter] = useState({
    typeFilter: 'all',
    categoryFilter: 'all'
  })
  const handleChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  const showOperationsFilter = (show) => {
    let filteredOperations = [...operations]
    if (show.typeFilter !== 'all') {
      filteredOperations = filteredOperations.filter(operation => {
        return operation.type === show.typeFilter
      })
    }
    if (show.categoryFilter !== 'all') {
      filteredOperations = filteredOperations.filter(operation => {
        return operation.category_id === parseInt(show.categoryFilter)
      })
    }

    setOperationsToShow([...filteredOperations])
  }

  useEffect(() => {
    setOperationsToShow([...operations])
  }, [operations])

  useEffect(() => {
    showOperationsFilter(filter)
  }, [filter])

  return (
    <>
      <Outlet />
      <h2>{title}</h2>
      {showFilters &&
        <div>
          <div>
            <label htmlFor='type-filter-form'>Type</label>
            <select id='type-filter-form' onChange={handleChange} name='typeFilter'>
              <option value='all'>All</option>
              <option value='income'>Income</option>
              <option value='expenditure'>Expenditure</option>
            </select>
          </div>
          <div>
            <label htmlFor='category-filter-form'>Category</label>
            <select id='category-filter-form' onChange={handleChange} name='categoryFilter'>
              <option value='all'>All</option>
              {categories && categories.map(category =>
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}({category.id})
                </option>)}
            </select>
          </div>
        </div>}

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
