const customerMe = {
  status: 'success',
  msg: 'success',
  data: {
    email: 'mrjhack@hotmail.com',
    name: 'vance',
    createdAt: '2020-06-12T02:30:52.000Z',
    customerProjectServices: [
      {
        id: 6,
        address: '0x2f56537CF2bD9E2354fA9785137E30C2e790BF60',
        createdAt: '2020-07-07T09:32:44.000Z',
      },
    ],
  },
}

const getMyProjectOrderList = {
  status: 'success',
  msg: 'success',
  data: [
    {
      amount: 10000,
      transactionCheckUrl: '',
      id: 1593764173536,
      uuid: 'b9893395-6664-414d-a76c-28c0b7c5c440',
      customerProjectServiceId: null,
      currency: 'TWD',
      paymentStatus: 1,
      merchantCompareProjectId: null,
      transactionHash: null,
      createdAt: '2020-07-03T08:16:13.000Z',
      project: {
        totalAmount: 3600000,
        IRR: 0.999999,
        repaymentType: 'MONTH_PAYMENT',
        id: 1,
        merchantId: '2',
        title: '花田有機美濃瓜',
        createdAt: '2020-07-03T02:00:11.000Z',
        updatedAt: '2020-07-03T02:00:11.000Z',
        startDate: '2020-07-01T09:56:17.000Z',
        endDate: '2020-08-11T09:56:17.000Z',
      },
    },
    {
      amount: 344.83,
      transactionCheckUrl:
        'https://rinkeby.etherscan.io/tx/0x6c5cae3d53bab424cad627e05071a062012faa53eb60a30319aefd814e0d188e',
      id: 1594186640378,
      uuid: 'f871ccf0-b783-4cbe-9192-d56e42ae7143',
      customerProjectServiceId: 5,
      currency: 'USDT',
      paymentStatus: 1,
      merchantCompareProjectId: null,
      transactionHash: '0x6c5cae3d53bab424cad627e05071a062012faa53eb60a30319aefd814e0d188e',
      createdAt: '2020-07-08T05:37:20.000Z',
      project: {
        totalAmount: 3600000,
        IRR: 0.999999,
        repaymentType: 'MONTH_PAYMENT',
        id: 1,
        merchantId: '2',
        title: '花田有機美濃瓜',
        createdAt: '2020-07-03T02:00:11.000Z',
        updatedAt: '2020-07-03T02:00:11.000Z',
        startDate: '2020-07-01T09:56:17.000Z',
        endDate: '2020-08-11T09:56:17.000Z',
      },
    },
  ],
  total: 2,
  page: 1,
}

const obj3 = { name: 'obj3' }

export { customerMe, getMyProjectOrderList, obj3 }
