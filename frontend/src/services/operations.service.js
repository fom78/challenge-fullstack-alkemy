import axios from 'axios'
import { HOST } from 'config'

const API_URL = `${HOST}operations/`

class OperationsService {
  create (data, accessToken) {
    return axios.post(API_URL, data, { headers: { 'x-access-token': accessToken } })
  }

  update (id, data, accessToken) {
    return axios.put(API_URL + id, data, { headers: { 'x-access-token': accessToken } })
  }

  delete (id) {
    return axios.delete(API_URL + id)
  }

  get (id, accessToken) {
    return axios.get(API_URL + id, { headers: { 'x-access-token': accessToken } })
  }

  getAll (accessToken) {
    return axios.get(API_URL, { headers: { 'x-access-token': accessToken } })
  }
}

export default new OperationsService()
