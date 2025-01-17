import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import classNames from 'classnames'
import {
  Typography,
  Card,
  Box,
  withStyles,
  Grid,
  lighten,
  LinearProgress,
  GridListTile,
  GridListTileBar,
  GridList,
  CardMedia,
} from '@material-ui/core'
import soldout from '../../../assets/soldout.png'
import timesup from '../../../assets/timesup.png'
import moment from 'moment'

const styles = (theme) => ({
  img: {
    width: '100%',
    height: '240px',
    marginBottom: 4,
    position: 'relative',
    top: '0',
    left: '0',
  },
  imgOver: {
    width: '100%',
    height: '240px',
    marginBottom: 4,
    position: 'absolute',
    top: '0',
    left: '0',
  },
  card: {
    boxShadow: theme.shadows[6],
    height: '500px',
    width: '30vw',
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  cardDisable: {
    boxShadow: theme.shadows[6],
    height: '500px',
    background: 'rgba(0, 0, 0, 0.30)',
    width: '30vw',
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  noDecorationClick: {
    textDecoration: 'none !important',
    pointerEvents: 'none',
  },
  title: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  titleDisable: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.22)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.22)',
    },
    '&:active': {
      color: 'rgba(0, 0, 0, 0.22)',
    },
  },
  link: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  TileBar: {
    height: '130px',
    //background: 'rgba(0, 0, 0, 0.60)',
    background: 'linear-gradient(180deg,rgba(51,51,51,0),#222)',
  },
  TileBarTitle: {
    fontSize: 20,
    letterSpacing: 2,
  },
  TileBarTitleDisable: {
    fontSize: 20,
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.28)',
  },
  TileBarTitleWrap: {
    marginTop: '70px',
  },
})

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

const thousands_separators = (num) => {
  let num_parts = num
    //.toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function ProjectCard(props) {
  const {
    classes,
    url,
    src,
    title,
    titleText,
    startDate,
    endDate,
    irr,
    totalAmount,
    repaymentType,
    investAmount,
    percent,
  } = props
  const [completed, setCompleted] = React.useState(0)
  const [countIRR, setcountIRR] = React.useState(0)
  const [IFendDate, setIFendDate] = React.useState(false)
  const [IFfullPercent, setIFfullPercent] = React.useState(false)
  const progress = React.useRef(() => {})
  React.useEffect(() => {
    if (moment().isAfter(moment(endDate, 'YYYY-MM-DD'))) {
      setIFendDate(true)
    }
    if (percent >= 100) {
      setIFfullPercent(true)
    }
    //console.log('dddddd', moment(endDate, 'YYYY-MM-DD').isValid())
  }, [])
  React.useEffect(() => {
    if (percent == 0) {
      setCompleted(0)
      setcountIRR(irr)
      return
    }
    progress.current = () => {
      if (completed >= percent) {
        setCompleted(percent)
        setcountIRR(irr)
        return
      } else {
        const diff = Math.random() * 10
        setCompleted(completed + diff)
        setcountIRR(countIRR + diff / 10)
      }
    }
  })

  React.useEffect(() => {
    function tick() {
      progress.current()
    }
    const timer = setInterval(tick, 150)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const imgSwitch = () => {
    if (IFendDate) {
      return (
        // <img src={timesup} className={classes.img} alt="" />
        <div>
          <img src={src} className={classes.img} alt="" />
          <img src={timesup} className={classes.imgOver} alt="" />
        </div>
      )
    } else if (IFfullPercent) {
      return (
        <div>
          <img src={src} className={classes.img} alt="" />
          <img src={soldout} className={classes.imgOver} alt="" />
        </div>
      )
    } else {
      return <img src={src} className={classes.img} alt="" />
    }
  }
  return (
    <Card className={IFfullPercent || IFendDate ? classes.cardDisable : classes.card}>
      <GridList cellHeight={'auto'}>
        {src && (
          <GridListTile key={src} style={{ height: 'auto', padding: '0px', width: '100%' }}>
            <Link to={url} tabIndex={-1} className={classNames(classes.noDecoration)}>
              {imgSwitch()}
              <GridListTileBar
                classes={
                  IFfullPercent || IFendDate
                    ? {
                        root: classes.TileBar,
                        title: classes.TileBarTitleDisable,
                        titleWrap: classes.TileBarTitleWrap,
                      }
                    : {
                        root: classes.TileBar,
                        title: classes.TileBarTitle,
                        titleWrap: classes.TileBarTitleWrap,
                      }
                }
                title={
                  <div>
                    <span>{`${titleText}`}</span>
                  </div>
                }
                titlePosition="bottom"
              />
            </Link>
          </GridListTile>
        )}
      </GridList>
      <Box p={2}>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs={12}>
            <Link to={url} className={classNames(classes.noDecoration)}>
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                  募資總額 $ {thousands_separators(totalAmount)} 元
                </span>
              </Typography>
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                  已投金額 $ {thousands_separators(investAmount)} 元
                </span>
              </Typography>
              <BorderLinearProgress variant="determinate" value={completed} />

              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>認購進度：</span>
                <span style={{ color: '#FF0000' }}>{completed.toFixed(2) + '%'}</span>
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                    <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                      起始時間：{startDate.slice(0, 10)}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                    <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                      結束時間：
                    </span>
                    <span style={{ color: '#FF0000' }}>{endDate.slice(0, 10)}</span>
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  src: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  irr: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  investAmount: PropTypes.number,
  percent: PropTypes.number,
  url: PropTypes.string.isRequired,
  repaymentType: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(ProjectCard)
