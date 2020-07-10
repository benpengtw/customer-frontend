import request from '../shared/request'
export interface LoginParamsType {
  email: string
  password: string
  //   mobile: string;
  //   captcha: string;
}

export async function AccountLogin(params: LoginParamsType) {
  return request('/customer/account/login', {
    //return request('/api/login/account', {
    method: 'POST',
    data: params,
  }).catch((error) => {
    // do something with request error
    const { response } = error
    console.log('err', response)
    return Promise.resolve(error)
  })
}
