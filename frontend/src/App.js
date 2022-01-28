import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
// components
import About from 'components/About'
import Error from 'components/Error'
import Form from 'components/Form'
import Home from 'components/Home'
import Layout from 'components/Layout'
import List from 'components/List'
import Spinner from 'components/Spinner'
// Hooks
import useUser from 'hooks/useUser'
// Service
import OperationsService from 'services/operations.service'
import CategoriesService from 'services/categories.service'

function App () {
  const [isLoading, setIsLoading] = useState(false)
  const [operations, setOperations] = useState([])
  const [categories, setCategories] = useState([])
  const [refreshList, setRefreshList] = useState(true)

  const { user, login, logout } = useUser()

  // Get all Categories from DB
  useEffect(() => {
    CategoriesService.getAll()
      .then((response) => {
        const categoriesFounded = response.data
        setCategories(categoriesFounded)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  // Get all Operations when refresh list
  useEffect(() => {
    if (refreshList || user) {
      if (user) {
        setIsLoading(true)
        OperationsService.getAll(user.token)
          .then((response) => {
            const operationsFounded = response.data
            setOperations(operationsFounded)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        setOperations([])
      }
    }
    if (user === null) {
      setOperations([])
    }
    setIsLoading(false)
    setRefreshList(false)
  }, [refreshList, user])

  return (

    <>
      {isLoading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout user={user} login={login} logout={logout} />}>
            <Route path='/' element={<Home user={user} login={login} operations={operations} />} />
            <Route path='/about' element={<About />} />
            <Route path='home' element={<Home user={user} login={login} operations={operations} />} />
            {user &&
              <Route path='list' element={<List categories={categories} operations={operations} setRefreshList={setRefreshList} />}>
                <Route path='add' element={<Form user={user} categories={categories} setRefreshList={setRefreshList} />} />
                <Route path='edit/:id' element={<Form user={user} categories={categories} setRefreshList={setRefreshList} edit />} />
              </Route>}
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
