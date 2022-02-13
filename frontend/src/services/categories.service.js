import axios from 'axios'
import { HOST } from 'config'

const API_URL = `${HOST}categories/`

class CategoriesService {
  getAll () {
    return axios.get(API_URL)
  }
}

export default new CategoriesService()
