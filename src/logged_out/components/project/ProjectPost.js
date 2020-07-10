import React, { useEffect, Fragment, useState, useRef, useCallback, useLayoutEffect } from 'react'
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
import TimerOffIcon from '@material-ui/icons/TimerOff'
import TimerIcon from '@material-ui/icons/Timer'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ProjectCardOld from './ProjectCardOld'
import ShareButton from '../../../shared/components/ShareButton'
import smoothScrollTop from '../../../shared/functions/smoothScrollTop'
import ImageGallery from 'react-image-gallery'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import { useParams } from 'react-router'
import moment from 'moment'
import 'react-image-gallery/styles/css/image-gallery.css'
import { MobXProviderContext, useObserver, Observer } from 'mobx-react'

function useStores() {
  return React.useContext(MobXProviderContext)
}
const styles = (theme) => ({
  projectContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1920,
    width: '100%',
  },
  wrapper: {
    //minHeight: '60vh',
    minHeight: '100%',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  card: {
    boxShadow: theme.shadows[3],
    height: '100%',
  },
  cardNoSticky: {
    boxShadow: theme.shadows[3],
    height: '82vh',
    width: '405px',
    display: 'flex',
    '@media (max-width: 960px)': {
      position: 'relative',
      top: 'auto',
    },
  },
  cardSticky: {
    boxShadow: theme.shadows[3],
    height: '82vh',
    //height: '730px',
    width: '405px',
    top: '6rem',
    right: 'calc(50%-585px)',
    position: 'fixed',
    '@media (max-width: 960px)': {
      position: 'relative',
      top: 'auto',
    },
  },
  timerIcon: {
    color: '#00468b',
    // textAlign: 'right',
  },
  timerOffIcon: {
    color: theme.palette.secondary.main,
    // textAlign: 'right',
  },
  gridOhers: {
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
})

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
    //.toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function useWindowSize() {
  const isClient = typeof window === 'object'
  function getSize() {
    return {
      height: isClient ? window.pageYOffset : 600,
      bodyHeight: isClient ? window.document.body.offsetHeight : undefined,
      windowHeight: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useLayoutEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('scroll', handleResize)
    return () => window.removeEventListener('scroll', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

function ProjectPost(props) {
  let store = useStores()
  const { userStore } = store
  const { classes, pushMessageToSnackbar } = props
  const { title, titleText, startDate, endDate, percent, totalAmount, irr, investAmount } = userStore.projectDetail
  const [completed, setCompleted] = useState(0)
  const [paymentType, setrPaymentType] = useState('CREDIT')
  const [amount, setAmount] = useState(1)
  const [clickbtn, setClickbtn] = useState(false)
  const [sticky, setSticky] = useState(true)
  const progress = useRef(() => {})
  const size = useWindowSize()
  const { id } = useParams()

  useEffect(() => {
    document.title = `安喬博德 - ${titleText}`
    smoothScrollTop()
  }, [title])

  useEffect(() => {
    if (userStore.formHTML.length > 370 && paymentType == 'CREDIT') {
      document.getElementById('newebpay').submit()
      return
    }
  }, [userStore.formHTML])

  useLayoutEffect(() => {
    if (size.height !== 0 && size.height > size.bodyHeight - size.windowHeight - 540) {
      setSticky(false)
      return
    } else {
      setSticky(true)
    }
  }, [size.height])

  useEffect(() => {
    userStore.getProjectDetail({
      payload: {
        id: id,
      },
    })
    userStore.projectViewCount({
      payload: {
        id: id,
      },
    })
    userStore.getProjectView()
  }, [id])

  useEffect(() => {
    if (percent == 0) {
      setCompleted(0)
      return
    }
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
    if (event.target.value <= 0) {
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
    setrPaymentType(event.target.value)
  }

  const onSubmit = () => {
    if (paymentType == 'CRYPTOCURRENCY') {
      console.log('CRYPTOCURRENCY', paymentType)
      userStore.invest({
        payload: {
          paymentType: 'CRYPTOCURRENCY',
          address: userStore.currentUser.address,
          amount: parseInt(amount) * 10000,
          currency: 'USDT',
          projectId: id,
        },
      })
    } else if (paymentType == 'CREDIT') {
      console.log('CREDIT', paymentType)
      userStore.investCredit({
        payload: {
          paymentType: 'CREDIT',
          amount: parseInt(amount) * 10000,
          DESC: titleText,
          email: userStore.currentUser.email,
          address: userStore.currentUser.address,
          currency: 'TWD',
          projectId: id,
        },
      })
    } else {
      return null
    }
  }

  const printSnackbar = () => {
    if (userStore.snackSuccess == 'failed') {
      userStore.initSnackSuccess()
      pushMessageToSnackbar({
        text: userStore.errorMessage,
        severity: 'error',
      })
    } else if (userStore.snackSuccess == 'success') {
      userStore.initSnackSuccess()
      pushMessageToSnackbar({
        text: 'Success!',
        severity: 'success',
      })
    } else {
      return null
    }
  }

  // const buildingType = () => {
  //   switch (userStore.projectDetail.column6) {
  //     case '1':
  //       return <span>住宅大樓(11層含以上有電梯)</span>
  //     case '2':
  //       return <span>華廈(10層含以下有電梯)</span>
  //     case '3':
  //       return <span>透天厝</span>
  //     case '4':
  //       return <span>公寓</span>
  //     default:
  //       return <span></span>
  //   }
  // }

  return useObserver(() => (
    <Box className={classNames('lg-p-top', classes.wrapper)} display="flex" justifyContent="center">
      {printSnackbar()}
      <div className={classes.projectContentWrapper}>
        {/* {console.log('height', size.height)}
        {console.log('bodyHeight', size.bodyHeight)}
        {console.log('windowHeight', size.windowHeight)} */}
        <Grid container spacing={3} alignItems="flex-stretch" direction="row" justify="center">
          <Grid item xl={2} md={2} xs={12} className={classes.gridOhers}>
            <Grid container spacing={1}>
              <Typography variant="h6" paragraph>
                其他投資計畫
              </Typography>
              {userStore.projectListView.map((projectPost) => (
                <Grid key={projectPost.id} item md={12} xs={12}>
                  <Box mb={12} xs={12} marginBottom="12px">
                    <ProjectCardOld
                      title={projectPost.title}
                      src={projectPost.imageSrc}
                      endDate={projectPost.endDate}
                      url={projectPost.url}
                      totalAmount={projectPost.totalAmount}
                      investAmount={projectPost.investAmount}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            <div dangerouslySetInnerHTML={{ __html: userStore.formHTML }} />
            <Card className={classes.card} variant="outlined">
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h4">
                  <b>{titleText}</b>
                </Typography>
                <br />
              </Box>
              <CardContent>
                <ImageGallery
                  items={userStore.projectDetail.photos}
                  useBrowserFullscreen={false}
                  showPlayButton={false}
                  showBullets={true}
                />
                <Divider style={{ marginTop: 16, marginBottom: 16, background: '#8B0000' }} />
                <Grid container spacing={3}>
                  <Grid container item spacing={1} item xs={6}>
                    <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                      <PlayArrowIcon style={{ fontSize: 10, color: '#8B0000' }} />
                      <span>內含物: {userStore.projectDetail.column1}</span>
                    </Typography>
                  </Grid>
                  <Grid container item spacing={1} item xs={6}>
                    <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                      <PlayArrowIcon style={{ fontSize: 10, color: '#8B0000' }} />
                      <span>產地: {userStore.projectDetail.column3}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid container item spacing={1} item xs={6}>
                    <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                      <PlayArrowIcon style={{ fontSize: 10, color: '#8B0000' }} />
                      <span>重量/規格: {userStore.projectDetail.column4}</span>
                    </Typography>
                  </Grid>
                  <Grid container item spacing={1} item xs={6}>
                    <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6} align="justify">
                      <PlayArrowIcon style={{ fontSize: 10, color: '#8B0000' }} />
                      <span>保存方式: {userStore.projectDetail.column5}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={{ marginTop: 16, marginBottom: 16, background: '#8B0000' }} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: userStore.projectDetail.column7 }} />
              </CardContent>
            </Card>
            <Box p={3}>
              <Grid spacing={1} container justify="flex-start" alignItems="center">
                {['Line', 'Facebook'].map((type, index) => (
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
          </Grid>
          <Grid container item xl={4} md={4} xs={12} alignItems="flex-end" direction="row" justify="center">
            <Grid item xl={12} md={12} xs={12}>
              <Card className={sticky ? classes.cardSticky : classes.cardNoSticky} variant="outlined">
                <CardContent>
                  <Typography variant="h5" gutterBottom={true}>
                    <b>投資內容</b>
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid container item item xs={6}>
                      <Grid item md={3} xs={4}>
                        <Box className={classes.timerIcon}>
                          <TimerIcon style={{ fontSize: 35 }} />
                        </Box>
                      </Grid>
                      <Grid item md={9} xs={8}>
                        <Box color="#00468b">
                          投資起始日
                          <br />
                          {startDate.slice(0, 10)}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container item item xs={6}>
                      <Grid item md={3} xs={4}>
                        <Box className={classes.timerOffIcon}>
                          <TimerOffIcon style={{ fontSize: 35 }} />
                        </Box>
                      </Grid>
                      <Grid item md={9} xs={8}>
                        <Box color="#8b0000 ">
                          投資到期日
                          <br />
                          {endDate.slice(0, 10)}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <span>認購進度：{completed.toFixed(2) + '%'}</span>
                  <BorderLinearProgress variant="determinate" value={completed} />
                  <br />
                  <Grid container spacing={1}>
                    <Grid container item spacing={1} item xs={6}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span style={{ color: '#00468b' }}> 募資總額</span>
                      </Typography>
                    </Grid>
                    <Grid container item spacing={1} item xs={6}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span style={{ color: '#00468b' }}> $ {thousands_separators(totalAmount)} 元</span>
                      </Typography>
                    </Grid>
                    <Grid container item spacing={1} item xs={6}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span style={{ color: '#8b0000 ' }}>已投金額 </span>
                      </Typography>
                    </Grid>
                    <Grid container item spacing={1} item xs={6}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span style={{ color: '#8b0000' }}>$ {thousands_separators(investAmount)} 元</span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  {userStore.currentUser.name ? (
                    <Fragment>
                      <Grid container spacing={1}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">請選擇投資方式</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={paymentType}
                            onChange={handleRadioChange}
                          >
                            <FormControlLabel value="CRYPTOCURRENCY" control={<Radio />} label="加密貨幣" />
                            <FormControlLabel value="CREDIT" control={<Radio />} label="信用卡" />
                            <FormControlLabel value="disabled" disabled control={<Radio />} label="虛擬帳戶轉帳" />
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
                              error={amount <= 0}
                              onChange={handleChange}
                              type="number"
                              //helperText={amount <= 0 && '投資金額不正確，請修改至正確數值'}
                              FormHelperTextProps={{ error: true }}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">萬</InputAdornment>,
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
                  ) : (
                    <Fragment>
                      <Typography variant="h4" fontWeight="fontWeightBold" letterSpacing={6}>
                        會員登入後才可進行投資
                      </Typography>
                    </Fragment>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  ))
}

ProjectPost.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  titleText: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  irr: PropTypes.number,
  totalAmount: PropTypes.number,
  investAmount: PropTypes.number,
  percent: PropTypes.number,
  id: PropTypes.number,
  pushMessageToSnackbar: PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(ProjectPost)
