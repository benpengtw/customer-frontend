import { observable, action } from 'mobx'
import agent from '../agent'
import { customerMe } from './userService'
class UserStore {
  @observable currentUser = {}
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

  @action forgetUser() {}

  @action async getMe() {
    const response = await customerMe()
    if (response.status === 'success') {
      this.currentUser = response.data
    }
    return
  }
}

export default new UserStore()
