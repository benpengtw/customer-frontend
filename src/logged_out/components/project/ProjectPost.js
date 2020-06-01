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
import ProjectCardOld from './ProjectCardOld'
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
  projectContentWrapper: {
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
  cardSticky: {
    boxShadow: theme.shadows[3],
    //height: '70%',
    height: '730px',
    top: '80px',
    position: 'fixed',
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

function ProjectPost(props) {
  let store = useStores()
  const { articlesStore, userStore } = store
  const { classes, date, title, otherArticles, titleText, startDate, endDate, percent, totalAmount, id } = props
  const [completed, setCompleted] = React.useState(0)
  const [rvalue, setrValue] = React.useState('female')
  const [amount, setAmount] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const [clickbtn, setClickbtn] = React.useState(false)
  const progress = React.useRef(() => {})
  useEffect(() => {
    document.title = `WG金融平台 - ${titleText}`
    smoothScrollTop()
  }, [title])

  useEffect(() => {
    articlesStore.loadfakeHouse()
    userStore.getProjectDetail({
      payload: {
        id: id,
      },
    })
  }, [])

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

  const buildingType = () => {
    switch (userStore.projectDetail.column6) {
      case '1':
        return <span>住宅大樓(11層含以上有電梯)</span>
      case '2':
        return <span>華廈(10層含以下有電梯)</span>
      case '3':
        return <span>透天厝</span>
      case '4':
        return <span>公寓</span>
      default:
        return <span></span>
    }
  }

  return useObserver(() => (
    <Box className={classNames('lg-p-top', classes.wrapper)} display="flex" justifyContent="center">
      {printSnackbar()}
      <div className={classes.projectContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={12}>
            {console.log('WalletAddress', userStore.currentUser.address)}
            {console.log('ProjectPost', userStore.projectDetail)}
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
            <Grid container spacing={2}>
              <Grid item md={8}>
                <Card className={classes.card} variant="outlined">
                  <CardContent>
                    <ImageGallery
                      items={userStore.projectDetail.photos}
                      useBrowserFullscreen={false}
                      showPlayButton={false}
                      showBullets={true}
                    />
                    <Divider />
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: articlesStore.fakeHouse.column7 }} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={12}>
                <Card className={classes.cardSticky} variant="outlined">
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
                          <span>建物坪數: {userStore.projectDetail.column2}坪</span>
                        </Typography>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>土地持分坪數: {userStore.projectDetail.column3}坪</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>車位: {userStore.projectDetail.column4}</span>
                        </Typography>
                      </Grid>
                      <Grid container item spacing={1} item xs={6}>
                        <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                          <span>建物類型: {buildingType()}</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span>市價: {userStore.projectDetail.column5}</span>
                      </Typography>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <Grid container spacing={1}>
                      <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={6}>
                        <span>地址: {userStore.projectDetail.column1}</span>
                      </Typography>
                    </Grid>
                    <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    <br />
                    {userStore.currentUser.name ? (
                      <Fragment>
                        <Grid container spacing={1}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">請選擇投資方式</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={rvalue} onChange={handleRadioChange}>
                              <FormControlLabel value="female" control={<Radio />} label="加密貨幣" />
                              <FormControlLabel value="male" control={<Radio />} label="信用卡" />
                              <FormControlLabel value="disabled" disabled control={<Radio />} label="虛擬帳戶轉帳" />
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
            <Box p={3}>
              <Grid spacing={1} container justify="flex-start" alignItems="center">
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
          </Grid>
        </Grid>
        <Typography variant="h6" paragraph>
          其他投資計畫
        </Typography>
        <Grid container spacing={3}>
          {otherArticles.slice(0, 4).map((projectPost) => (
            <Grid key={projectPost.id} item md={3}>
              <Box mb={3}>
                <ProjectCardOld
                  title={projectPost.titleText}
                  src={projectPost.imageSrc}
                  endDate={projectPost.endDate}
                  url={`${projectPost.url}${projectPost.params}`}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  ))
}

ProjectPost.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  irr: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  percent: PropTypes.number,
  otherArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
}

export default withStyles(styles, { withTheme: true })(ProjectPost)
