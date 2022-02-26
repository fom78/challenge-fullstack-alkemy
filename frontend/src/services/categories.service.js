import axios from 'axios'
import { HOST } from 'config'

const API_URL = `${HOST}categories/`

class CategoriesService {
  create (data, accessToken) {
    return axios.post(API_URL, data, { headers: { 'x-access-token': accessToken } })
  }

  getAll () {
    return axios.get(API_URL)
  }

  update (id, data, accessToken) {
    return axios.put(API_URL + id, data, { headers: { 'x-access-token': accessToken } })
  }
}

export default new CategoriesService()
