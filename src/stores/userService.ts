import request from '../shared/request'

export async function customerMe() {
  return request('/customer/me').catch((error) => {
    // do something with request error
    const { response } = error
    console.log('err', response)
    return Promise.resolve(error)
  })
}

export async function getProjectList() {
  return (
    request('/project/?sort=DESC')
      // .then((response) => {
      //   const status: any = response.status
      //   if (status === 'success') {
      //     //this.projectList = response.data
      //     response.data.map((project) => ({
      //       irr: project.IRR * 10,
      //       investAmount: 60,
      //       startDate: project.startDate,
      //       endDate: project.endDate,
      //       url: '/project/post/' + project.id,
      //       id: project.id,
      //       imageSrc: project.projectMutiplePhotos[0],
      //       percent: 77,
      //       title: project.title,
      //       totalAmount: 20650,
      //     }))
      //   }
      // })
      .catch((error) => {
        const { response } = error
        if (response) {
          console.log('err', response)
        }
        return Promise.resolve(error)
      })
  )
}
