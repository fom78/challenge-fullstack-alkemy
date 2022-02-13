import { useEffect, useState } from 'react'
// context
import { useAuth } from 'context/AuthContext'
// services
import OperationsService from 'services/operations.service'

export default function useOperations () {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [operations, setOperations] = useState([])
  const [refreshList, setRefreshList] = useState(true)

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

  return { refreshList, setRefreshList, operations, isLoading }
}
