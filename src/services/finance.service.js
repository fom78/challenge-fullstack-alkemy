import axios from 'axios'

// const API_URL = `http://localhost:4000/operations/`

const API_URL = `https://personal-finance-alkemy.herokuapp.com/operations/`

class FinanceService {
  create (data) {
    return axios.post(API_URL, data)
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

export default new FinanceService()
