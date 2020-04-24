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
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem.
    </Typography>
    <Typography variant="h6" paragraph>
      Title
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </Typography>
    <Typography variant="h6" paragraph>
      Title
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem.
    </Typography>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
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
    snippet: 'Lorem ipsum dolor sit amet',
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
    snippet: 'Lorem ipsum dolor sit amet',
    content: content,
    startDate: '2020-03-11',
    endDate: '2020-04-11',
    irr: 7.5,
    totalAmount: 795,
    percent: 45,
    repaymentType: '每月付息到期還本',
  },
  {
    title: 'Post 3',
    titleText: '新北市三芝長勤街公寓',
    id: 3,
    date: 1593068400,
    imageSrc: blogPost3,
    snippet: 'Lorem ipsum dolor sit amet',
    content: content,
    startDate: '2020-04-24',
    endDate: '2020-06-25',
    irr: 8.4,
    totalAmount: 235,
    percent: 45,
    repaymentType: '到期還本',
  },
  {
    title: 'Post 4',
    titleText: '南投縣埔里鎮東興二街透天',
    id: 4,
    date: 1593414000,
    imageSrc: blogPost4,
    snippet: 'Lorem ipsum dolor sit amet',
    content: content,
    startDate: '2020-04-23',
    endDate: '2020-06-29',
    irr: 8.7,
    totalAmount: 1328,
    percent: 100,
    repaymentType: '每月付息到期還本',
  },
  {
    title: 'Post 5',
    titleText: '台北市信義區虎林街公寓',
    id: 5,
    date: 1595833200,
    imageSrc: blogPost5,
    snippet: 'Lorem ipsum dolor sit amet',
    content: content,
    startDate: '2020-04-21',
    endDate: '2020-07-27',
    irr: 6.7,
    totalAmount: 836,
    percent: 24,
    repaymentType: '每月付息到期還本',
  },
  {
    title: 'Post 6',
    titleText: '新北市三峽區民族街電梯華廈',
    id: 6,
    date: 1601103600,
    imageSrc: blogPost6,
    snippet: 'Lorem ipsum dolor sit amet',
    content: content,
    startDate: '2020-04-22',
    endDate: '2020-09-26',
    irr: 6.8,
    totalAmount: 13520,
    percent: 96,
    repaymentType: '每月付息到期還本',
  },
]
