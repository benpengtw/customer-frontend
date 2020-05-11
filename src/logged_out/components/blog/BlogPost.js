import React, { useEffect, Fragment } from 'react'
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
  Button,
  lighten,
  LinearProgress,
  TextField,
  InputAdornment,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import TimerIcon from '@material-ui/icons/Timer'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import BlogCardOld from './BlogCardOld'
import ShareButton from '../../../shared/components/ShareButton'
import smoothScrollTop from '../../../shared/functions/smoothScrollTop'
import ImageGallery from 'react-image-gallery'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import 'react-image-gallery/styles/css/image-gallery.css'
import { MobXProviderContext, useObserver, Observer } from 'mobx-react'
function useStores() {
  return React.useContext(MobXProviderContext)
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
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
    boxShadow: theme.shadows[3],
    height: '100%',
  },
  timerIcon: {
    color: '#00468b',
    // textAlign: 'right',
  },
  timerOffIcon: {
    color: theme.palette.secondary.main,
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

const fakeContent = (
  <Fragment>
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        <Grid item>
          <Box
            style={{
              checkCircleIcon: {
                color: '#40c440',
              },
            }}
            justifyContent="right"
          >
            <CheckCircleIcon style={{ color: '#40c440' }} />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            步行4分鐘到大里火車站、公車站
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        <Grid item>
          <Box
            style={{
              checkCircleIcon: {
                color: '#40c440',
              },
            }}
            justifyContent="right"
          >
            <CheckCircleIcon style={{ color: '#40c440' }} />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            大里海邊、草嶺古道，依山傍水
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        <Grid item>
          <Box
            style={{
              checkCircleIcon: {
                color: '#40c440',
              },
            }}
            justifyContent="right"
          >
            <CheckCircleIcon style={{ color: '#40c440' }} />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            緊鄰學區大里國民小學
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="flex-start" spacing={1}>
        <Grid item>
          <Box
            style={{
              checkCircleIcon: {
                color: '#40c440',
              },
            }}
            justifyContent="right"
          >
            <CheckCircleIcon style={{ color: '#40c440' }} />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            第一順位
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Fragment>
)

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#8b0000', 0.5),
  },
  bar: {
    borderRadius: 30,
    backgroundColor: '#8b0000',
  },
})(LinearProgress)

const thousands_separators = (num) => {
  let num_parts = num
    .toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function BlogPost(props) {
  let store = useStores()
  const { articlesStore, userStore } = store
  const {
    classes,
    date,
    title,
    src,
    content,
    otherArticles,
    titleText,
    startDate,
    endDate,
    percent,
    totalAmount,
    id,
  } = props
  const [completed, setCompleted] = React.useState(0)
  const [rvalue, setrValue] = React.useState('female')
  const [amount, setAmount] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const [clickbtn, setClickbtn] = React.useState(false)
  const progress = React.useRef(() => {})
  useEffect(() => {
    document.title = `customer-frontend - ${titleText}`
    smoothScrollTop()
  }, [title])

  useEffect(() => {
    articlesStore.loadfakeHouse()
    //console.log('aaa', props)
  }, [])

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

  const handleChange = (event) => {
    if (event.target.value < 0) {
      setAmount(0)
      setClickbtn(true)
    }
    if (event.target.value > 0) {
      setAmount(event.target.value)
      setClickbtn(false)
    }
    setAmount(event.target.value)
  }

  const handleRadioChange = (event) => {
    setrValue(event.target.value)
  }

  const onSubmit = () => {
    userStore.invest({
      payload: {
        paymentType: 'CRYPTOCURRENCY',
        address: userStore.currentUser.address,
        amount: parseInt(amount),
        currency: 'USDT',
        projectId: id,
      },
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const printSnackbar = () => {
    switch (userStore.snackSuccess) {
      case 'success':
        return (
          <Snackbar
            disableWindowBlurListener
            key="disableWindowBlurListener"
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>
        )
      case 'failed':
        return (
          <Snackbar
            disableWindowBlurListener
            key="disableWindowBlurListener"
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handleClose}
          >
            <Alert severity="error" onClose={handleClose}>
              This is an error message!
            </Alert>
          </Snackbar>
        )
      default:
        return null
    }
  }

  return useObserver(() => (
    <Box className={classNames('lg-p-top', classes.wrapper)} display="flex" justifyContent="center">
      {printSnackbar()}
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={12}>
            {/*console.log('BlogPost', userStore.currentUser.address)*/}
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
                <Card className={classes.card} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" gutterBottom={true}>
                      <b>投資內容</b>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerIcon}>
                            <TimerIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#00468b">
                            投資起始日
                            <br />
                            {startDate}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Grid item md={2} xs={4}>
                          <Box className={classes.timerOffIcon}>
                            <TimerOffIcon style={{ fontSize: 35 }} />
                          </Box>
                        </Grid>
                        <Grid item md={10} xs={8}>
                          <Box color="#8b0000 ">
                            投資到期日
                            <br />
                            {endDate}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* money */}
                    <br />
                    <span>認購進度：{completed.toFixed(2) + '%'}</span>
                    <BorderLinearProgress variant="determinate" value={completed} />
                    <br />
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span style={{ color: '#8b0000 ' }}>已投金額 </span>/
                          <span style={{ color: '#00468b' }}> 貸款總額</span>
                        </Typography>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span style={{ color: '#8b0000' }}>
                            $ {thousands_separators(totalAmount * (completed / 100))} 萬{' '}
                          </span>{' '}
                          /<span style={{ color: '#00468b' }}> $ {thousands_separators(totalAmount)} 萬</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>建物坪數: {articlesStore.fakeHouse.column2}坪</span>
                        </Typography>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>土地持分坪數: {articlesStore.fakeHouse.column3}坪</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>車位: {articlesStore.fakeHouse.column4}</span>
                        </Typography>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>類型: {articlesStore.fakeHouse.column6}</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span>市價: {articlesStore.fakeHouse.column5}</span>
                      </Typography>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span>地址: {articlesStore.fakeHouse.column1}</span>
                      </Typography>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    {fakeContent}
                    <br />
                    {userStore.currentUser.name && (
                      <Fragment>
                        <Grid container spacing={1}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">請選擇投資方式</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={rvalue} onChange={handleRadioChange}>
                              <FormControlLabel value="female" control={<Radio />} label="加密貨幣" />
                              <FormControlLabel value="male" control={<Radio />} label="信用卡" />
                              <FormControlLabel value="other" control={<Radio />} label="虛擬帳戶轉帳" />
                              <FormControlLabel value="disabled" disabled control={<Radio />} label="Line Pay" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                        <Grid container spacing={1}>
                          <Grid container item spacing={1} item xs={6} justify="flex-end">
                            <Typography variant="h4" fontWeight="fontWeightBold" letterSpacing={6}>
                              我要投資：
                            </Typography>
                          </Grid>
                          <Grid container item spacing={1} item xs={4}>
                            <Typography variant="h4" fontWeight="fontWeightBold" letterSpacing={6}>
                              <TextField
                                id="standard-adornment-weight"
                                value={amount}
                                error={amount < 0}
                                onChange={handleChange}
                                type="number"
                                helperText={amount < 0 && '投資金額不正確，請修改至正確數值'}
                                FormHelperTextProps={{ error: true }}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">萬元</InputAdornment>,
                                }}
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1} justify="center" alignItems="flex-end">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                            className={classes.button}
                            startIcon={<TrendingUpIcon />}
                            disabled={clickbtn}
                          >
                            我要投資{userStore.isLoadingInvest && <ButtonCircularProgress />}
                          </Button>
                        </Grid>
                      </Fragment>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box p={3}>
              <Grid spacing={1} container justify="center" alignItems="center">
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
  ))
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
  id: PropTypes.number.isRequired,
}

export default withStyles(styles, { withTheme: true })(BlogPost)
