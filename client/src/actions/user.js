import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export default {
  users(url = baseUrl + '/user/') {
    return {
      fetchAll: () => axios.get(url),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    }
  },
}
