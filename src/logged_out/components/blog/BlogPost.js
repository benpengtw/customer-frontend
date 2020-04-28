import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import format from 'date-fns/format'
import {
  Grid,
  Typography,
  Card,
  Box,
  withStyles,
  CardActions,
  CardContent,
  Divider,
  Paper,
  lighten,
  LinearProgress,
} from '@material-ui/core'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import TimerIcon from '@material-ui/icons/Timer'
import BlogCardOld from './BlogCardOld'
import ShareButton from '../../../shared/components/ShareButton'
//import ZoomImage from '../../../shared/components/ZoomImage'
import smoothScrollTop from '../../../shared/functions/smoothScrollTop'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1600,
    width: '100%',
  },
  wrapper: {
    minHeight: '60vh',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  card: {
    boxShadow: theme.shadows[4],
  },
  timerIcon: {
    color: '#3c5a99',
    // textAlign: 'right',
  },
  timerOffIcon: {
    color: '#fa6900',
    // textAlign: 'right',
  },
})

const images = [
  {
    original:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/847/f5b52d3e-8248-486a-8ff6-e0c53e6ce6d2.JPG',
    thumbnail:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/847/f5b52d3e-8248-486a-8ff6-e0c53e6ce6d2.JPG',
  },
  {
    original:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/848/3fb5148b-5186-429c-8c11-a001f9f43bb3.JPG',
    thumbnail:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/848/3fb5148b-5186-429c-8c11-a001f9f43bb3.JPG',
  },
  {
    original:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/849/6d43c863-a7ac-491b-b060-ce0aed603340.JPG',
    thumbnail:
      'https://d1g2pem5yharpo.cloudfront.net/uploads/image/file/000/016/849/6d43c863-a7ac-491b-b060-ce0aed603340.JPG',
  },
]

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 30,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress)

function BlogPost(props) {
  const { classes, date, title, src, content, otherArticles, titleText, startDate, endDate, percent } = props
  console.log('aaa', props)
  const [completed, setCompleted] = React.useState(0)
  const progress = React.useRef(() => {})
  useEffect(() => {
    document.title = `customer-frontend - ${titleText}`
    smoothScrollTop()
  }, [title])

  useEffect(() => {
    progress.current = () => {
      if (completed >= percent) {
        setCompleted(percent)
        return
      } else {
        const diff = Math.random() * 10
        setCompleted(completed + diff)
      }
    }
  })

  useEffect(() => {
    function tick() {
      progress.current()
    }
    const timer = setInterval(tick, 150)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box className={classNames('lg-p-top', classes.wrapper)} display="flex" justifyContent="center">
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={12}>
            {/* <Card className={classes.card}> */}
            <Box pt={3} pr={3} pl={3} pb={2}>
              <Typography variant="h4">
                <b>{titleText}</b>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {format(new Date(date * 1000), 'PPP', {
                  awareOfUnicodeTokens: true,
                })}
              </Typography>
            </Box>
            {/* <ZoomImage className={classes.img} src={src} alt="" /> */}
            <Grid container spacing={2}>
              <Grid item md={8}>
                <ImageGallery items={images} useBrowserFullscreen={false} showPlayButton={false} showBullets={true} />
              </Grid>
              <Grid item md={4} xs={12}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} gutterBottom>
                      投資內容
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerIcon}>
                            <TimerIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#3c5a99">
                            投資起始日
                            <br />
                            {startDate}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container item spacing={0} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerOffIcon}>
                            <TimerOffIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#fa6900">
                            投資到期日
                            <br />
                            {endDate}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* money */}

                    <BorderLinearProgress variant="determinate" value={completed} />

                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerIcon}>
                            <TimerIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#3c5a99">
                            投資起始日
                            <br />
                            {startDate}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container item spacing={0} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerOffIcon}>
                            <TimerOffIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#fa6900">
                            投資到期日
                            <br />
                            {endDate}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box p={3}>
              {content}
              <Box pt={2}>
                <Grid spacing={1} container>
                  {['Line', 'E-Mail', 'Facebook'].map((type, index) => (
                    <Grid item key={index}>
                      <ShareButton
                        type={type}
                        title={titleText}
                        description={titleText}
                        disableElevation
                        variant="contained"
                        className="text-white"
                        classes={{
                          label: 'text-white',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            {/* </Card> */}
          </Grid>
        </Grid>
        <Typography variant="h6" paragraph>
          其他投資計畫
        </Typography>
        <Grid container spacing={3}>
          {otherArticles.slice(0, 4).map((blogPost) => (
            <Grid key={blogPost.id} item md={3}>
              <Box mb={3}>
                <BlogCardOld
                  title={blogPost.titleText}
                  date={blogPost.date}
                  src={blogPost.imageSrc}
                  url={`${blogPost.url}${blogPost.params}`}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  )
}

BlogPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  irr: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,
  percent: PropTypes.number.isRequired,
  otherArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles, { withTheme: true })(BlogPost)
