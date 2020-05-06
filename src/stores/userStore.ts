import { observable, action } from 'mobx'
import request from '../shared/request'
import agent from '../agent'
//import { customerMe } from './userService'
class UserStore {
  @observable isLoading = false
  @observable isLoadingAddress = false
  @observable isLoadingInvest = false
  @observable snackSuccess = ''
  @observable currentUser = {
    email: '',
    name: '',
    address: '',
  }
  @observable loadingUser
  @observable oneInvestAmount = 0
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
    return request('/customer/me')
      .then(
        action((response) => {
          const status: any = response.status
          if (status === 'success') {
            this.currentUser.email = response.data.email
            this.currentUser.name = response.data.name
            this.currentUser.address = response.data.customerProjectServices[0].address
          }
        })
      )
      .catch((error) => {
        const { response } = error
        if (response) {
          console.log('err', response)
        }
        return Promise.resolve(error)
      })
  }

  @action getProject() {
    return request('/project')
      .then(
        action((response) => {
          const status: any = response.status
          if (status === 'success') {
            this.oneInvestAmount = response.data[0].ProjectsInvestingListingTotalAmount
          }
        })
      )
      .catch((error) => {
        const { response } = error
        if (response) {
          console.log('err', response)
        }
        return Promise.resolve(error)
      })
  }

  @action addWallet({ payload }) {
    this.isLoadingAddress = true
    return request('/customer/me/address', {
      method: 'POST',
      data: payload,
    })
      .then(
        action((response) => {
          const status: any = response.status
          setTimeout(() => {
            if (status === 'success') {
              this.isLoadingAddress = false
              this.snackSuccess = 'success'
            }
          }, 3000)
        })
      )
      .catch(
        action((error) => {
          setTimeout(() => {
            this.isLoadingAddress = false
            this.snackSuccess = 'failed'
            const { response } = error
            console.log('err', response)
            return Promise.resolve(error)
          }, 3000)
        })
      )
  }

  @action invest({ payload }) {
    this.isLoadingInvest = true
    return request('/project/' + payload.projectId + '/invest', {
      method: 'POST',
      data: payload,
    })
      .then(
        action((res) => {
          const status: any = res.status
          setTimeout(() => {
            if (status === 'success') {
              this.isLoadingInvest = false
              this.snackSuccess = 'success'
              window.location.href =
                'http://54.64.193.122:81/?address=' +
                res.data.projectAddress +
                '&amount=' +
                res.data.cryptoAmount +
                '&humanAmount=' +
                res.data.amount +
                '&currency=' +
                res.data.currency +
                '&tokenAddress=' +
                res.data.tokenAddress
            }
          }, 3000)
        })
      )
      .catch(
        action((error) => {
          this.isLoadingInvest = false
          this.snackSuccess = 'failed'
          const { response } = error
          console.log('err', response)
          return Promise.resolve(error)
        })
      )
  }
}

export default new UserStore()
