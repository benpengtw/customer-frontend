import request from '../shared/request'

export async function customerMe() {
  return request('/customer/me').catch((error) => {
    // do something with request error
    const { response } = error
    console.log('err', response)
    return Promise.resolve(error)
  })
}
