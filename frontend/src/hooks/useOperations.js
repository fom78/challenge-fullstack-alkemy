import { useEffect, useState } from 'react'
// services
import OperationsService from 'services/operations.service'

export default function useOperations (user) {
  const [noError, setNoError] = useState(true)
  const [fetchingOperations, setFetchingOperations] = useState(true)
  // const [refreshList, setRefreshList] = useState(true)
  const [operations, setOperations] = useState([])

  // const prueba = () => {
  //   if (!refreshList) {
  //     console.log('pepepeepepe')
  //     setRefreshList(true)
  //   }
  // }

  const fetchOperations = async () => {
    try {
      if (fetchingOperations) {
        const response = await OperationsService.getAll(user.token)
        const operationsFounded = response.data
        setOperations(operationsFounded)
      }
      setFetchingOperations(false)
    } catch (error) {
      console.log(error)
      setNoError(false)
    }
  }
  // Get all Operations when refresh list
  useEffect(() => {
    // const fetchOperations = async () => {
    //   try {
    //     if (fetchingOperations) {
    //       const response = await OperationsService.getAll(user.token)
    //       const operationsFounded = response.data
    //       setOperations(operationsFounded)
    //     }
    //     setFetchingOperations(false)
    //   } catch (error) {
    //     console.log(error)
    //     setNoError(false)
    //   }
    // }
    fetchOperations()
    // setRefreshList(false)
    // if (refreshList) {
    // }
  }, [user])

  return { operations, noError, fetchingOperations, setFetchingOperations, fetchOperations }
}
