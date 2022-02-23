import { useEffect, useState } from 'react'
// services
import OperationsService from 'services/operations.service'
import CategoriesService from 'services/categories.service'

export default function useOperations (user) {
  const [noError, setNoError] = useState(true)
  const [fetchingOperations, setFetchingOperations] = useState(true)
  const [operations, setOperations] = useState([])
  const [categories, setCategories] = useState([])

  // Get categories
  const fetchCategories = () => {
    CategoriesService.getAll()
      .then((response) => {
        const categoriesFounded = response.data
        setCategories(categoriesFounded)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const fetchOperations = async () => {
    try {
      if (fetchingOperations) {
        const response = await OperationsService.getAll(user.token)
        const operationsFounded = response.data
        setOperations(operationsFounded)
      }
      setFetchingOperations(false)
    } catch (error) {
      console.log({ error })
      setNoError(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Get all Operations when refresh list
  useEffect(() => {
    if (user) {
      fetchOperations()
    }
    return () => { setFetchingOperations(false) }
  }, [user])

  return { categories, operations, noError, fetchingOperations, setFetchingOperations, fetchOperations }
}
