import { AxiosRequestConfig } from 'axios'

const setAxiosConfig = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}')

  let config: AxiosRequestConfig = {}
  if ('accessToken' in auth) {
    config = {
      headers: { Authorization: 'Bearer ' + auth.accessToken },
    }
    return config
  }
  return config
}

export default setAxiosConfig
