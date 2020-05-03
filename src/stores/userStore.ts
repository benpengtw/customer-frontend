import { observable, action } from 'mobx'
import request from '../shared/request'
import agent from '../agent'
//import { customerMe } from './userService'
class UserStore {
  @observable isLoading = false
  @observable currentUser = {
    email:'' ,
    name: '',
  }
  @observable currentUserName
  @observable loadingUser
  @observable updatingUser
  @observable updatingUserErrors

  @action pullUser() {
    this.loadingUser = true
    return agent.Auth.current()
      .then(
        action(({ user }) => {
          this.currentUser = user
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false
        })
      )
  }

  @action updateUser(newUser) {
    this.updatingUser = true
    return agent.Auth.save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false
        })
      )
  }

  @action forgetUser() {
    this.currentUser.name = ''
    this.currentUser.email = '' 
  }

  @action getMe() {
    // const response = await customerMe()
    // if (response.status === 'success') {
    //   this.currentUser.email = response.data.email
    //   this.currentUser.name = response.data.name
    // }
    // return
    return request('/customer/me').then(
      action((response) => {
        const status:any=response.status
        if (status === 'success') {
            this.currentUser.email = response.data.email
            this.currentUser.name = response.data.name
            this.currentUserName=response.data.name
        }
      })
    ).catch((error) => {
      // do something with request error
      const { response } = error
      console.log('err', response)
      return Promise.resolve(error)
    })
  }
}

export default new UserStore()
