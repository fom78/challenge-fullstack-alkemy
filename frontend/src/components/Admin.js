import { useEffect, useState } from 'react'
// components
import Category from './Category'
// contexts
import { useAuth } from 'context/AuthContext'
// hooks
import useOperations from 'hooks/useOperations'
// styles
import styled from 'styled-components'
import CategoryForm from './CategoryForm'

export default function Admin () {
  const { user } = useAuth()
  const { categories, fetchCategories } = useOperations(user)
  const [refresh, setRefresh] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    if (refresh) {
      fetchCategories()
      setRefresh(false)
    }
  }, [refresh])
  // Send req to API

  // const add = e => {
  //   e.preventDefault()
  //   if (!edit) {
  //     if (operation.concept === '' || operation.amount === '' || operation.date === '' || operation.type === '' || operation.categoryId === '') {
  //       setError(true)
  //     } else {
  //       setError(false)
  //       setIsLoading(true)
  //       OperationsService.create(operation, user.token)
  //         .then((response) => {
  //           // Notify user
  //           toast.success('Operation added', {
  //             position: 'top-center',
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined
  //           })
  //           setIsLoading(false)
  //         })
  //         .catch((e) => {
  //           console.log(e)
  //         })
  //       // Redirect
  //       navigate('/list')
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (error) {
  //     toast.error('Complete all require inputs', {
  //       position: 'top-center',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     })
  //     setError(false)
  //   }
  // }, [error])

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Categories</h2>
        {showAdd
          ? <Button onClick={() => setShowAdd(false)} red>Cancel</Button>
          : <Button onClick={() => setShowAdd(true)} green>Add</Button>}
      </div>
      {showAdd && <CategoryForm refresh={setRefresh} setShowForm={setShowAdd} adding />}
      {categories.map(category =>
        <Category key={category.id} category={category} refresh={setRefresh} />)}
    </Container>
  )
}

const Container = styled.section`
  background-color: var(--white);
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  & >h1 { font-size: 1.5rem; }
  & >div { 
    display: flex;
    justify-content: space-between;
    & >h2 {font-size: 1.3rem;} 
  }
  & .link {color: var(--red)}
`
const Button = styled.button`
    display: inline-block;
    width: 100px;
    margin: auto 5px;
    height: 38px;
    padding: 0 5px;
    box-sizing: border-box;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    background-color: #33c3f0;
    border-color: #33c3f0;
    ${(props) => props.red && 'border-color: var(--red); background-color: var(--red);'}
    ${(props) => props.green && 'border-color: var(--green); background-color: var(--green);'}    
    cursor: pointer;
    & > svg {
      vertical-align: middle;
    }
`
