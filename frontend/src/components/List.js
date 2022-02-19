import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// Components
import Operation from './Operation'
import Form from './Form'
import Spinner from './Spinner'
// context
import { useAuth } from 'context/AuthContext'
// hooks
import useOperations from 'hooks/useOperations'
// Styles
import styled from 'styled-components'

const List = ({ categories, showFilters = true, title = 'List of operations', actions = true, quantity = 'all', edit = false }) => {
  const { user } = useAuth()
  const { operations, fetchingOperations } = useOperations(user)

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
        return operation.category.id === parseInt(show.categoryFilter)
      })
    }

    setOperationsToShow([...filteredOperations])
  }

  useEffect(() => {
    if (quantity !== 'all') {
      const lastOperations = operations.sort((a, b) => b.id - a.id).slice(0, quantity)
      setOperationsToShow(lastOperations)
    } else {
      setOperationsToShow(operations)
    }
  }, [operations])

  useEffect(() => {
    showOperationsFilter(filter)
  }, [filter])

  if (fetchingOperations) {
    return <><Outlet /><Spinner /></>
  }

  return (
    <>
      <Outlet />
      {edit &&
        <Form categories={categories} edit />}
      <h2>{title}</h2>
      {showFilters &&
        <Filters>
          <div className='filter'>
            <label htmlFor='type-filter-form'>Type</label>
            <select id='type-filter-form' onChange={handleChange} name='typeFilter'>
              <option value='all'>All</option>
              <option value='income'>Income</option>
              <option value='expenditure'>Expenditure</option>
            </select>
          </div>
          <div className='filter'>
            <label htmlFor='category-filter-form'>Category</label>
            <select id='category-filter-form' onChange={handleChange} name='categoryFilter'>
              <option value='all'>All</option>
              {categories && categories.map(category =>
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>)}
            </select>
          </div>
        </Filters>}

      <ListStyled>
        {operationsToShow && operationsToShow.map(operation => {
          return (
            <Operation
              key={operation.id}
              operation={operation}
              actions={actions}
            />
          )
        })}
      </ListStyled>
    </>
  )
}

export default List

const ListStyled = styled.div`
  padding-bottom: 1.5rem;
  background-color: var(--white);
`
const Filters = styled.div`
  display: flex;
  padding-bottom: 1rem;
  width: 100%;
  justify-content: space-between;
  & .filter {
    display: flex;
    flex-direction: column;
    & > label {
      font-size: .8rem;
      margin-bottom: .3rem;
    }
    & > select {
      height: 38px;
      padding: 6px 10px;
      background-color: #fff;
      border: 1px solid #D1D1D1;
      border-radius: 4px;
      box-shadow: none;
      box-sizing: border-box;
    }
  }
`
