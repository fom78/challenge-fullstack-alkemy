import axios from 'axios'
import { HOST } from 'config'

const API_URL = `${HOST}auth/`

class AuthService {
  create (data, accessToken) {
    return axios.post(API_URL, data, { headers: { 'x-access-token': accessToken } })
  }

  update (id, data) {
    return axios.put(API_URL + id, data)
  }

  delete (id) {
    return axios.delete(API_URL + id)
  }

  get (id) {
    return axios.get(API_URL + id)
  }

  getAll () {
    return axios.get(API_URL)
  }
}

export default new AuthService()
