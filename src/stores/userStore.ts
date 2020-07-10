import { observable, action } from 'mobx'
import request from '../shared/request'
import agent from '../agent'
import { TradeModules } from '../shared/TradInfo'
//import { AxiosResponse } from './data.d'
import fakeProjectList from './fakeProjectList'
import { customerMe, getMyProjectOrderList, project4, project3, project2, project1 } from './fakeProjectOthers'
class UserStore {
  @observable qrUrl = process.env.REACT_APP_URL || ''
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
  @observable projectOrderList = [
    {
      id: 0,
      currency: '',
      totalAmount: 0,
      title: '',
      endDate: '',
      irr: 0,
      updatedAt: '',
      amount: 0,
      transactionCheckUrl: '',
    },
  ]
  @observable projectList = [
    {
      irr: 0,
      investAmount: 0,
      startDate: '',
      endDate: '',
      id: 0,
      imageSrc: '',
      percent: 0,
      title: '',
      titleText: '',
      totalAmount: 0,
      repaymentType: '',
      url: '/project/post/0',
    },
  ]
  @observable projectListView = [
    {
      irr: 0,
      investAmount: 0,
      startDate: '',
      endDate: '',
      id: 0,
      imageSrc: '',
      title: '',
      totalAmount: 0,
      url: '/project/post/0',
    },
  ]
  @observable projectDetail = {
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    column7: '',
    photos: [{}],
    irr: 0,
    investAmount: 0,
    startDate: '',
    endDate: '',
    imageSrc: '',
    percent: 0,
    title: '',
    titleText: '',
    totalAmount: 0,
  }
  @observable errorMessage = ''
  @observable formHTML = ''
  @observable pageCount = 1
  @action init() {
    this.projectList = [
      {
        irr: 0,
        investAmount: 0,
        startDate: '',
        endDate: '',
        id: 0,
        imageSrc: '',
        percent: 0,
        title: '',
        titleText: '',
        totalAmount: 0,
        repaymentType: '',
        url: '/project/post/0',
      },
    ]
  }

  @action initListView() {
    this.projectListView = [
      {
        irr: 0,
        investAmount: 0,
        startDate: '',
        endDate: '',
        id: 0,
        imageSrc: '',
        title: '',
        totalAmount: 0,
        url: '/project/post/0',
      },
    ]
  }

  @action initSnackSuccess() {
    this.snackSuccess = ''
  }

  @action getMyProjectOrderList({ payload }) {
    // return request('/customer/me/projectOrder/list', {
    //   params: {
    //     sort: payload.sort,
    //   },
    // })
    //   .then(
    //     action((response) => {
    //       this.projectOrderList = response.data.map((project) => ({
    //         id: project.project.id,
    //         currency: project.currency,
    //         totalAmount: project.project.totalAmount,
    //         title: project.project.title,
    //         endDate: project.project.endDate,
    //         irr: project.project.IRR ? project.project.IRR * 10 : 0,
    //         updatedAt: project.createdAt,
    //         amount: project.amount,
    //         transactionCheckUrl: project.transactionCheckUrl,
    //       }))
    //     })
    //   )
    //   .catch((error) => {
    //     const { response } = error
    //     if (response) {
    //       console.log('err', response)
    //     }
    //     return Promise.resolve(error)
    //   })
    const status: any = getMyProjectOrderList.status
    if (status === 'success') {
      this.projectOrderList = getMyProjectOrderList.data.map((project) => ({
        id: project.project.id,
        currency: project.currency,
        totalAmount: project.project.totalAmount,
        title: project.project.title,
        endDate: project.project.endDate,
        irr: project.project.IRR * 10,
        updatedAt: project.createdAt,
        amount: project.amount,
        transactionCheckUrl: project.transactionCheckUrl,
      }))
    }
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
    // return request('/customer/me')
    //   .then(
    //     action((response) => {
    //       const status: any = response.status
    //       if (status === 'success') {
    //         this.currentUser.email = response.data.email
    //         this.currentUser.name = response.data.name
    //         this.currentUser.address = response.data.customerProjectServices[0].address
    //         window.sessionStorage.setItem('address', response.data.customerProjectServices[0].address)
    //       }
    //     })
    //   )
    //   .catch((error) => {
    //     const { response } = error
    //     if (response) {
    //       console.log('err', response)
    //     }
    //     return Promise.resolve(error)
    //   })
    const status: any = customerMe.status
    if (status === 'success') {
      this.currentUser.email = customerMe.data.email
      this.currentUser.name = customerMe.data.name
      this.currentUser.address = customerMe.data.customerProjectServices[0].address
      window.sessionStorage.setItem('address', customerMe.data.customerProjectServices[0].address)
    }
  }

  @action getProject({ payload }) {
    // return request('/project/?sort=ASC&page=' + payload.page)
    //   .then(
    //     action((response: AxiosResponse) => {
    //       this.init()
    //       const status: any = response.status
    //       const total: any = response.total
    //       if (status === 'success') {
    //         this.pageCount = Math.ceil(total / 10)
    //         this.projectList = response.data.map((project) => {
    //           return {
    //             url: `/project/post/${project.id}`,
    //             irr: project.IRR ? project.IRR * 10 : 0,
    //             investAmount: project.ProjectsInvestingListingTotalAmount
    //               ? project.ProjectsInvestingListingTotalAmount
    //               : 0,
    //             startDate: project.startDate,
    //             endDate: project.endDate,
    //             id: project.id,
    //             imageSrc: project.projectMutiplePhotos[0].coverUrl,
    //             percent: project.ProjectsInvestingListingTotalAmount
    //               ? Math.round((project.ProjectsInvestingListingTotalAmount / project.totalAmount) * 100)
    //               : 0,
    //             title: project.title,
    //             titleText: project.title,
    //             totalAmount: project.totalAmount,
    //             repaymentType: '每月付息到期還本',
    //           }
    //         })
    //       }
    //     })
    //   )
    //   .catch((error) => {
    //     const { response } = error
    //     if (response) {
    //       console.log('err', response)
    //     }
    //     return Promise.resolve(error)
    //   })
    const total: any = fakeProjectList.total
    const status: any = fakeProjectList.status
    if (status === 'success') {
      this.pageCount = Math.ceil(total / 10)
      this.projectList = fakeProjectList.data.map((project) => {
        return {
          url: `/project/post/${project.id}`,
          irr: project.IRR ? project.IRR * 10 : 0,
          investAmount: project.ProjectsInvestingListingTotalAmount ? project.ProjectsInvestingListingTotalAmount : 0,
          startDate: project.startDate,
          endDate: project.endDate,
          id: project.id,
          imageSrc: project.projectMutiplePhotos[0].coverUrl,
          percent: project.ProjectsInvestingListingTotalAmount
            ? Math.round((project.ProjectsInvestingListingTotalAmount / project.totalAmount) * 100)
            : 0,
          title: project.title,
          titleText: project.title,
          totalAmount: project.totalAmount,
          repaymentType: '每月付息到期還本',
        }
      })
    }
  }

  @action getProjectView() {
    // return request('/project/view/list?size=6')
    //   .then(
    //     action((response: AxiosResponse) => {
    //       this.initListView()
    //       const status: any = response.status
    //       if (status === 'success') {
    //         this.projectListView = response.data.map((project) => {
    //           return {
    //             url: `/project/post/${project.id}`,
    //             irr: project.IRR ? project.IRR * 10 : 0,
    //             investAmount: project.ProjectsInvestingListingTotalAmount
    //               ? project.ProjectsInvestingListingTotalAmount
    //               : 0,
    //             startDate: project.startDate,
    //             endDate: project.endDate,
    //             id: project.id,
    //             imageSrc: project.projectMutiplePhotos[0].coverUrl,
    //             title: project.title,
    //             totalAmount: project.totalAmount,
    //           }
    //         })
    //       }
    //     })
    //   )
    //   .catch((error) => {
    //     const { response } = error
    //     if (response) {
    //       console.log('err', response)
    //     }
    //     return Promise.resolve(error)
    //   })
    const status: any = fakeProjectList.status
    if (status === 'success') {
      this.projectListView = fakeProjectList.data.map((project) => {
        return {
          url: `/project/post/${project.id}`,
          irr: project.IRR ? project.IRR * 10 : 0,
          investAmount: project.ProjectsInvestingListingTotalAmount ? project.ProjectsInvestingListingTotalAmount : 0,
          startDate: project.startDate,
          endDate: project.endDate,
          id: project.id,
          imageSrc: project.projectMutiplePhotos[0].coverUrl,
          title: project.title,
          totalAmount: project.totalAmount,
        }
      })
    }
  }

  @action getProjectDetail({ payload }) {
    // return request('/project/' + payload.id)
    //   .then(
    //     action((response) => {
    //       this.projectDetail.column1 = response.data.projectInfo.column1
    //       this.projectDetail.column2 = response.data.projectInfo.column2
    //       this.projectDetail.column3 = response.data.projectInfo.column3
    //       this.projectDetail.column4 = response.data.projectInfo.column4
    //       this.projectDetail.column5 = response.data.projectInfo.column5
    //       this.projectDetail.column6 = response.data.projectInfo.column6
    //       this.projectDetail.column7 = response.data.projectInfo.column7
    //       this.projectDetail.photos = response.data.projectMutiplePhotos.map((photo) => ({
    //         original: photo.coverUrl,
    //         thumbnail: photo.coverUrl,
    //       }))
    //       this.projectDetail.totalAmount = response.data.totalAmount
    //       this.projectDetail.irr = response.data.IRR ? response.data.IRR * 10 : 0
    //       this.projectDetail.investAmount = response.data.ProjectsInvestingListingTotalAmount
    //         ? response.data.ProjectsInvestingListingTotalAmount
    //         : 0
    //       this.projectDetail.startDate = response.data.startDate
    //       this.projectDetail.endDate = response.data.endDate
    //       this.projectDetail.percent = response.data.ProjectsInvestingListingTotalAmount
    //         ? Math.round((response.data.ProjectsInvestingListingTotalAmount / response.data.totalAmount) * 100)
    //         : 0
    //       this.projectDetail.title = response.data.title
    //       this.projectDetail.titleText = response.data.title
    //     })
    //   )
    //   .catch((error) => {
    //     const { response } = error
    //     if (response) {
    //       console.log('err', response)
    //     }
    //     return Promise.resolve(error)
    //   })
    const fakeArray = [project1, project2, project3, project4]
    this.projectDetail.column1 = fakeArray[payload.id - 1].data.projectInfo.column1
    this.projectDetail.column2 = fakeArray[payload.id - 1].data.projectInfo.column2
    this.projectDetail.column3 = fakeArray[payload.id - 1].data.projectInfo.column3
    this.projectDetail.column4 = fakeArray[payload.id - 1].data.projectInfo.column4
    this.projectDetail.column5 = fakeArray[payload.id - 1].data.projectInfo.column5
    this.projectDetail.column6 = fakeArray[payload.id - 1].data.projectInfo.column6
    this.projectDetail.column7 = fakeArray[payload.id - 1].data.projectInfo.column7
    this.projectDetail.photos = fakeArray[payload.id - 1].data.projectMutiplePhotos.map((photo) => ({
      original: photo.coverUrl,
      thumbnail: photo.coverUrl,
    }))
    this.projectDetail.totalAmount = fakeArray[payload.id - 1].data.totalAmount
    this.projectDetail.irr = fakeArray[payload.id - 1].data.IRR * 10
    this.projectDetail.investAmount = fakeArray[payload.id - 1].data.ProjectsInvestingListingTotalAmount
    this.projectDetail.startDate = fakeArray[payload.id - 1].data.startDate
    this.projectDetail.endDate = fakeArray[payload.id - 1].data.endDate
    this.projectDetail.percent = fakeArray[payload.id - 1].data.ProjectsInvestingListingTotalAmount
      ? Math.round(
          (fakeArray[payload.id - 1].data.ProjectsInvestingListingTotalAmount /
            fakeArray[payload.id - 1].data.totalAmount) *
            100
        )
      : 0
    this.projectDetail.title = fakeArray[payload.id - 1].data.title
    this.projectDetail.titleText = fakeArray[payload.id - 1].data.title
  }

  @action projectViewCount({ payload }) {
    return request('/project/' + payload.id + '/view', {
      method: 'POST',
    })
  }

  @action addWallet({ payload }) {
    this.isLoadingAddress = true
    this.snackSuccess = ''
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
          this.isLoadingInvest = false
          this.snackSuccess = 'failed'
          const { response } = error
          this.errorMessage = response.data.message || ''
          console.log('err', response)
          return Promise.resolve(error)
        })
      )
  }

  @action invest({ payload }) {
    this.isLoadingInvest = true
    this.snackSuccess = ''
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
                this.qrUrl +
                '/qrpage/?address=' +
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
          this.errorMessage = response.data.message || ''
          console.log('err', response)
          return Promise.resolve(error)
        })
      )
  }

  @action investCredit({ payload }) {
    this.isLoadingInvest = true
    this.snackSuccess = ''
    // return request('/project/' + payload.projectId + '/invest', {
    //   method: 'POST',
    //   data: payload,
    // })
    //   .then(
    //     action((response) => {
    //       console.log('investCredit', response)
    //       const trade = new TradeModules()
    //       const tradeInfo = trade.getTradeInfo(
    //         payload.amount,
    //         payload.DESC,
    //         payload.email,
    //         response.data.projectOrderId
    //       )
    //       console.log('tradeInfo', tradeInfo.TradeSha)
    //       var szHtml =
    //         '<form id="newebpay" method="post" action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post" >'
    //       szHtml += '<input type="hidden" name="MerchantID" value="' + tradeInfo.MerchantID + '" type="hidden">'
    //       szHtml += '<input type="hidden" name="TradeInfo" value="' + tradeInfo.TradeInfo + '" type="hidden">'
    //       szHtml += '<input type="hidden" name="TradeSha" value="' + tradeInfo.TradeSha + '" type="hidden">'
    //       szHtml += '<input type="hidden" name="Version"  value="' + tradeInfo.Version + '" type="hidden">'
    //       szHtml += '</form>'

    //       this.formHTML = szHtml
    //       return szHtml
    //     })
    //   )
    //   .catch(
    //     action((error) => {
    //       this.isLoadingInvest = false
    //       this.snackSuccess = 'failed'
    //       const { response } = error
    //       console.log('err', response)
    //       return Promise.resolve(error)
    //     })
    //   )
    const dateTime = Date.now()
    const timestamp = Math.floor(dateTime / 1000)
    const trade = new TradeModules()
    const tradeInfo = trade.getTradeInfo(payload.amount, payload.DESC, payload.email, timestamp.toString())
    console.log('tradeInfo', tradeInfo.TradeSha)
    var szHtml = '<form id="newebpay" method="post" action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post" >'
    szHtml += '<input type="hidden" name="MerchantID" value="' + tradeInfo.MerchantID + '" type="hidden">'
    szHtml += '<input type="hidden" name="TradeInfo" value="' + tradeInfo.TradeInfo + '" type="hidden">'
    szHtml += '<input type="hidden" name="TradeSha" value="' + tradeInfo.TradeSha + '" type="hidden">'
    szHtml += '<input type="hidden" name="Version"  value="' + tradeInfo.Version + '" type="hidden">'
    szHtml += '</form>'

    this.formHTML = szHtml
    return szHtml
  }
}

export default new UserStore()
