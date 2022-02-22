import axios from 'axios'
import { HOST } from 'config'

const API_URL = `${HOST}auth/`

class AuthService {
  create (data, accessToken) {
    return axios.post(API_URL, data, { headers: { 'x-access-token': accessToken } })
  }
}

export default new AuthService()
