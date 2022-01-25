import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
// components
import Error from 'components/Error'
import Form from 'components/Form'
import Home from 'components/Home'
import Layout from 'components/Layout'
import List from 'components/List'
// Service
import OperationsService from 'services/operations.service'
import CategoriesService from 'services/categories.service'

function App () {
  const [operations, setOperations] = useState([])
  const [categories, setCategories] = useState([])
  const [refreshList, setRefreshList] = useState(true)

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
    if (refreshList) {
      setRefreshList(false)
      OperationsService.getAll()
        .then((response) => {
          const operationsFounded = response.data
          setOperations(operationsFounded)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [refreshList])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home operations={operations} />} />
          <Route path='home' element={<Home operations={operations} />} />
          <Route path='list' element={<List categories={categories} operations={operations} setRefreshList={setRefreshList} />}>
            <Route path='add' element={<Form setRefreshList={setRefreshList} />} />
            <Route path='edit/:id' element={<Form categories={categories} setRefreshList={setRefreshList} edit />} />
            <Route path='delete/:id' element={<Form categories={categories} setRefreshList={setRefreshList} deletes />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
