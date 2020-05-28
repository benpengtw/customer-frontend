import axios from 'axios'
const request = axios.create({
  baseURL: process.env.REACT_APP_URL + ':7002/customer_api/v1',
  timeout: 6000, // request timeout
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const url = config.url

    console.log('request', config)
    console.log('NODE_ENV', process.env.NODE_ENV)
    let tokenLocalStorage: string | null = localStorage.getItem('token')
    const limitUrl = {
      login: '/customer/account/login',
      projectList: '/project',
      forget: '/api/merchant/me/forget_password',
      reset_password: '/api/merchant/me/reset_password',
    }

    if (
      (tokenLocalStorage === null || tokenLocalStorage.length === 0) &&
      !Object.keys(limitUrl)
        .map((key) => limitUrl[key] === url)
        .find((d) => d == true)
    ) {
      //alert('You need login')
      window.location.href = '/'
      return config
    }

    if (tokenLocalStorage === null) {
      tokenLocalStorage = ''
      return config
    }

    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: tokenLocalStorage,
      ...config.headers,
    }
    return config
  }
  // error => {
  //   // do something with request error
  //   const { response } = error;
  //   console.log('err', response);
  //   return Promise.resolve(error);
  // },
)

// response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log('response', res)
    let { token } = res.data
    if (token !== undefined && token !== null && token.length > 0) {
      token = `Bearer ${token}`
      localStorage.setItem('token', token)
    }

    return res
  }
  // error => {
  //   console.log('response' + error); // for debug
  //   const { response } = error;
  //   console.log('err', response);
  //   return Promise.resolve(error);
  // },
)

export default request
