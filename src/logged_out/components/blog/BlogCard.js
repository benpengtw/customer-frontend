import React from 'react'
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
  },
  card: {
    boxShadow: theme.shadows[6],
    height: '500px',
  },
  cardDisable: {
    boxShadow: theme.shadows[6],
    height: '500px',
    background: 'rgba(0, 0, 0, 0.30)',
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
  overlay: {
    position: 'absolute',
    // color: theme.palette.primary.main,
    height: '75%',
    // width: '80%',
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
    .toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function BlogCard(props) {
  const {
    classes,
    url,
    src,
    date,
    title,
    titleText,
    snippet,
    startDate,
    endDate,
    irr,
    totalAmount,
    percent,
    repaymentType,
  } = props
  const [completed, setCompleted] = React.useState(0)
  const [countIRR, setcountIRR] = React.useState(0)
  const [IFendDate, setIFendDate] = React.useState(false)
  const [IFfullPercent, setIFfullPercent] = React.useState(false)
  const progress = React.useRef(() => {})
  React.useEffect(() => {
    if (moment().isAfter(moment(endDate, 'YYYY-MM-DD'))) {
      console.log('sss', endDate)
      setIFendDate(true)
    }
    if (percent == 100) {
      console.log('sss', endDate)
      setIFfullPercent(true)
    }
    console.log('dddddd', moment(endDate, 'YYYY-MM-DD').isValid())
  }, [])
  React.useEffect(() => {
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
  return (
    <Card className={IFfullPercent || IFendDate ? classes.cardDisable : classes.card}>
      <GridList cellHeight={'auto'}>
        {src && (
          <GridListTile key={src} style={{ height: 'auto', padding: '0px', width: '100%' }}>
            <Link
              to={IFfullPercent || IFendDate ? '#' : url}
              tabIndex={-1}
              className={
                IFfullPercent || IFendDate ? classNames(classes.noDecorationClick) : classNames(classes.noDecoration)
              }
            >
              <img src={src} className={classes.img} alt="" />
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
                title={titleText}
                titlePosition="bottom"
              />
            </Link>
            {IFendDate && <img src={timesup} className={classes.overlay} alt="" />}
            {IFfullPercent && <img src={soldout} className={classes.overlay} alt="" />}
          </GridListTile>
        )}
      </GridList>
      <Box p={2}>
        <Grid container>
          <Grid item xs={6}>
            <Link
              to={IFfullPercent || IFendDate ? '#' : url}
              className={
                IFfullPercent || IFendDate ? classNames(classes.noDecorationClick) : classNames(classes.noDecoration)
              }
            >
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                  貸款總額 $ {thousands_separators(totalAmount)} 萬
                </span>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link
              to={IFfullPercent || IFendDate ? '#' : url}
              className={
                IFfullPercent || IFendDate ? classNames(classes.noDecorationClick) : classNames(classes.noDecoration)
              }
            >
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>年化報酬率：</span>
                <span style={{ color: '#FF0000' }}>{countIRR.toFixed(1) + '%'}</span>
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs={12}>
            <Link
              to={IFfullPercent || IFendDate ? '#' : url}
              className={
                IFfullPercent || IFendDate ? classNames(classes.noDecorationClick) : classNames(classes.noDecoration)
              }
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                    <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                      已投金額 $ {thousands_separators(totalAmount * (completed / 100))} 萬
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                    <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                      認購進度：
                    </span>
                    <span style={{ color: '#FF0000' }}>{completed.toFixed(2) + '%'}</span>
                  </Typography>
                </Grid>
              </Grid>
              <BorderLinearProgress className={classes.progress} variant="determinate" value={completed} />
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                  起始時間：{startDate}
                </span>
              </Typography>
              <Typography variant="subtitle1" fontWeight="fontWeightBold" letterSpacing={1}>
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>結束時間：</span>
                <span style={{ color: '#FF0000' }}>{endDate}</span>
              </Typography>
              <Typography variant="body2">
                <span className={IFfullPercent || IFendDate ? classes.titleDisable : classes.title}>
                  還款方式： {repaymentType}
                </span>
                {/*console.log('aaa', IFendDate)*/}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

BlogCard.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  irr: PropTypes.number.isRequired,
  snippet: PropTypes.string.isRequired,
  src: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  repaymentType: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(BlogCard)
