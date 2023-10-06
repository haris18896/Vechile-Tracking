import axios from 'axios'
import toast from 'react-hot-toast'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

const API_URL = 'https://app.sparning.ai/api/v1'

const axiosApi = axios.create({
  baseURL: API_URL
})

axiosApi.interceptors.request.use(function (config) {
  let data = JSON.parse(localStorage.getItem('UserData'))
  config.headers['token'] = data ? data.token : ''

  return config
})

const AxiosInterceptorsSetup = ({ navigate }) => {
  axiosApi.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status === 401) {
        navigate('/401')

        return
      }

      if (error.response.status === 403) {
        navigate('/403')

        return
      }

      return Promise.reject(error)
    }
  )
}

export default AxiosInterceptorsSetup

export async function get(url, config = {}) {
  return axiosApi.get(url, { ...config })
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config })
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config })
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config })
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, { ...config })
}

export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then(response => response.data)
}
