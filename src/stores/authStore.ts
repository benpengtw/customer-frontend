import { observable, action } from 'mobx'
import agent from '../agent'
import userStore from './userStore'
import commonStore from './commonStore'
//import { AccountLogin } from './authService'
class AuthStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable values = {
    email: '',
    password: '',
    isLogged: false,
  }

  @action setEmail(email) {
    this.values.email = email
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action reset() {
    this.values.email = ''
    this.values.password = ''
  }

  @action async login({ payload, history }) {
    this.inProgress = true
    this.errors = undefined
    // console.log('payload', payload)
    // console.log('history', history)
    // const response = await AccountLogin(payload)
    // if (response.status === 'success') {
    //   this.values.isLogged = true
    //   setTimeout(() => {
    //     history.push('/c/dashboard')
    //   }, 150)
    // }
    this.values.isLogged = true
    setTimeout(() => {
      history.push('/c/dashboard')
    }, 150)
    return
  }

  @action register() {
    this.inProgress = true
    this.errors = undefined
    return agent.Auth.register(this.values.email, this.values.password)
      .then(({ user }) => commonStore.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(
        action((err) => {
          this.errors = err.response && err.response.body && err.response.body.errors
          throw err
        })
      )
      .finally(
        action(() => {
          this.inProgress = false
        })
      )
  }

  @action logout() {
    commonStore.setToken(undefined)
    userStore.forgetUser()
    return Promise.resolve()
  }
}

export default new AuthStore()
