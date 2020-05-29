import { observable, action } from 'mobx'
import request from '../shared/request'
import agent from '../agent'

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
  @observable updatingUser
  @observable updatingUserErrors
  @observable projectOrderList = []
  @observable projectList = [
    {
      irr: 0,
      investAmount: 0,
      startDate: '',
      endDate: '',
      url: '',
      imageSrc: '',
      percent: 0,
      title: '',
      repaymentType: '',
      amount: 0,
      totalAmount: 0,
      id: 0,
    },
  ]

  @action getMyProjectOrderList({ payload }) {
    return request('/customer/me/projectOrder/list', {
      params: {
        sort: payload.sort,
      },
    })
      .then(
        action((response) => {
          this.projectOrderList = response.data.map((project) => ({
            totalAmount: project.project.totalAmount,
            title: project.project.title,
            endDate: project.project.endDate,
            amount: project.amount,
          }))
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
    return request('/customer/me')
      .then(
        action((response) => {
          const status: any = response.status
          if (status === 'success') {
            this.currentUser.email = response.data.email
            this.currentUser.name = response.data.name
            this.currentUser.address = response.data.customerProjectServices[0].address
            window.localStorage.setItem('address', response.data.customerProjectServices[0].address)
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
    return request('/project/?sort=DESC')
      .then(
        action((response) => {
          const status: any = response.status
          if (status === 'success') {
            //this.projectList = response.data
            this.projectList = response.data.map((project) => ({
              irr: project.IRR * 10,
              investAmount: project.ProjectsInvestingListingTotalAmount,
              startDate: project.startDate,
              endDate: project.endDate,
              id: project.id,
              imageSrc: project.projectMutiplePhotos[0].coverUrl,
              percent: Math.round((30000000000 / project.totalAmount) * 100),
              repaymentType: '每月付息到期還本',
              title: project.title,
              titleText: project.title,
              totalAmount: project.totalAmount,
            }))
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
                process.env.REACT_APP_URL +
                ':81/?address=' +
                res.data.projectAddress +
                '&amount=' +
                res.data.cryptoAmount +
                '&humanAmount=' +
                res.data.amount +
                '&currency=' +
                res.data.currency +
                '&tokenAddress=' +
                res.data.tokenAddress +
                '&userAddress=' +
                this.currentUser.address
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
