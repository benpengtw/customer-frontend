import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import blogPost1 from './images/blogPost1.jpg'
import blogPost2 from './images/blogPost2.jpg'
import blogPost3 from './images/blogPost3.jpg'
import blogPost4 from './images/blogPost4.jpg'
import blogPost5 from './images/blogPost5.jpg'
import blogPost6 from './images/blogPost6.jpg'

const content = (
  <Fragment>
    <Typography variant="h6" paragraph>
      ✔步行4分鐘到大里火車站、公車站
    </Typography>
    <Typography variant="h6" paragraph>
      ✔大里海邊、草嶺古道，依山傍水
    </Typography>
    <Typography variant="h6" paragraph>
      ✔緊鄰學區大里國民小學
    </Typography>
    <Typography variant="h6" paragraph>
      ✔第一順位
    </Typography>
  </Fragment>
)

export default [
  {
    title: 'Post 1',
    titleText: '台北市士林區中山北路透天',
    id: 1,
    date: 1598511600,
    imageSrc: blogPost1,
    content: content,
    startDate: '2020-01-21',
    endDate: '2020-08-27',
    irr: 8.5,
    totalAmount: 1369,
    percent: 77,
    repaymentType: '每月付息到期還本',
  },
  {
    title: 'Post 2',
    titleText: '新北市三重區大同南路透天',
    id: 2,
    date: 1586588400,
    imageSrc: blogPost2,
    content: content,
    startDate: '2020-03-11',
    endDate: '2020-04-11',
    irr: 7.5,
    totalAmount: 795,
    percent: 45,
    repaymentType: '每月付息到期還本',
  },
  {
    title: 'Post 20',
    titleText: '新北市三芝長勤街公寓',
    id: 20,
    date: 1593068400,
    imageSrc: blogPost3,
    content: content,
    startDate: '2020-04-24',
    endDate: '2020-06-25',
    irr: 8.4,
    totalAmount: 235,
    percent: 45,
    repaymentType: '到期還本',
  },
  // {
  //   title: 'Post 4',
  //   titleText: '南投縣埔里鎮東興二街透天',
  //   id: 4,
  //   date: 1593414000,
  //   imageSrc: blogPost4,
  //   content: content,
  //   startDate: '2020-04-23',
  //   endDate: '2020-06-29',
  //   irr: 8.7,
  //   totalAmount: 1328,
  //   percent: 100,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 5',
  //   titleText: '台北市信義區虎林街公寓',
  //   id: 5,
  //   date: 1595833200,
  //   imageSrc: blogPost5,
  //   content: content,
  //   startDate: '2020-04-21',
  //   endDate: '2020-07-27',
  //   irr: 6.7,
  //   totalAmount: 836,
  //   percent: 24,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 6',
  //   titleText: '新北市三峽區民族街電梯華廈',
  //   id: 6,
  //   date: 1601103600,
  //   imageSrc: blogPost6,
  //   content: content,
  //   startDate: '2020-04-22',
  //   endDate: '2020-09-26',
  //   irr: 6.8,
  //   totalAmount: 13520,
  //   percent: 96,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 7',
  //   titleText: '台北市士林區中山北路透天',
  //   id: 7,
  //   date: 1598511600,
  //   imageSrc: blogPost1,
  //   content: content,
  //   startDate: '2020-01-21',
  //   endDate: '2020-08-27',
  //   irr: 8.5,
  //   totalAmount: 1369,
  //   percent: 77,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 8',
  //   titleText: '新北市三重區大同南路透天',
  //   id: 8,
  //   date: 1586588400,
  //   imageSrc: blogPost2,
  //   content: content,
  //   startDate: '2020-03-11',
  //   endDate: '2020-04-11',
  //   irr: 7.5,
  //   totalAmount: 795,
  //   percent: 45,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 9',
  //   titleText: '新北市三芝長勤街公寓',
  //   id: 9,
  //   date: 1593068400,
  //   imageSrc: blogPost3,
  //   content: content,
  //   startDate: '2020-04-24',
  //   endDate: '2020-06-25',
  //   irr: 8.4,
  //   totalAmount: 235,
  //   percent: 45,
  //   repaymentType: '到期還本',
  // },
  // {
  //   title: 'Post 10',
  //   titleText: '南投縣埔里鎮東興二街透天',
  //   id: 10,
  //   date: 1593414000,
  //   imageSrc: blogPost4,
  //   content: content,
  //   startDate: '2020-04-23',
  //   endDate: '2020-06-29',
  //   irr: 8.7,
  //   totalAmount: 1328,
  //   percent: 100,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 11',
  //   titleText: '台北市信義區虎林街公寓',
  //   id: 11,
  //   date: 1595833200,
  //   imageSrc: blogPost5,
  //   content: content,
  //   startDate: '2020-04-21',
  //   endDate: '2020-07-27',
  //   irr: 6.7,
  //   totalAmount: 836,
  //   percent: 24,
  //   repaymentType: '每月付息到期還本',
  // },
  // {
  //   title: 'Post 12',
  //   titleText: '新北市三峽區民族街電梯華廈',
  //   id: 12,
  //   date: 1601103600,
  //   imageSrc: blogPost6,
  //   content: content,
  //   startDate: '2020-04-22',
  //   endDate: '2020-09-26',
  //   irr: 6.8,
  //   totalAmount: 13520,
  //   percent: 96,
  //   repaymentType: '每月付息到期還本',
  // },
]
