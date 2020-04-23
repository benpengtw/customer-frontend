import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import classNames from 'classnames'
import CountUp from 'react-countup'
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
const styles = (theme) => ({
  img: {
    width: '100%',
    height: '240px',
    marginBottom: 4,
  },
  card: {
    boxShadow: theme.shadows[6],
    height: '700px',
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  title: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
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
  showFocus: {
    '&:focus span': {
      color: theme.palette.secondary.dark,
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
  var num_parts = num.toString().split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function BlogCard(props) {
  const { classes, url, src, date, title, snippet, startDate, endDate, irr, totalAmount } = props
  const [completed, setCompleted] = React.useState(0)
  const [countAmount, setcountAmount] = React.useState(0)
  const [countIRR, setcountIRR] = React.useState(0)
  const progress = React.useRef(() => {})
  React.useEffect(() => {
    progress.current = () => {
      if (completed >= 80) {
        setCompleted(80)
        setcountAmount(totalAmount * 0.8)
        setcountIRR(irr)
        return
      } else {
        const diff = Math.random() * 10
        setCompleted(completed + diff)
        setcountAmount(countAmount + countAmount * (diff / 100))
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
    <Card className={classes.card}>
      <GridList cellHeight={'auto'}>
        {src && (
          <GridListTile key={src} style={{ height: 'auto', padding: '0px', width: '100%' }}>
            <Link to={url} tabIndex={-1}>
              <img src={src} className={classes.img} alt="" />
              <GridListTileBar
                classes={{
                  root: classes.TileBar,
                  title: classes.TileBarTitle,
                  titleWrap: classes.TileBarTitleWrap,
                }}
                title={title}
                titlePosition="bottom"
              />
            </Link>
            <img src={soldout} className={classes.overlay} alt="" />
          </GridListTile>
        )}
      </GridList>
      <Box p={2}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary">
              {format(new Date(date * 1000), 'PPP', {
                awareOfUnicodeTokens: true,
              })}
            </Typography>
            <Typography fontWeight="fontWeightBold" variant="subtitle1" letterSpacing={1}>
              <span>貸款總額 $ {thousands_separators(totalAmount)} 萬</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="fontWeightBold" variant="subtitle1" letterSpacing={1}>
              年化報酬率：<span style={{ color: '#FF0000' }}>{countIRR.toFixed(1) + '%'}</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs={12}>
            <div className={classes.progressLabel}>
              <span>{completed.toFixed(2) + '%'}</span>
            </div>
            <div className={classes.progressLabel}>
              <span>已投金額 $ {thousands_separators(countAmount)} 萬</span>
            </div>
            <BorderLinearProgress className={classes.progress} variant="determinate" value={completed} />
          </Grid>
        </Grid>
        <Typography variant="body1" color="textSecondary">
          {snippet}
          <Link to={url} className={classes.noDecoration} tabIndex={-1}>
            <span className={classes.link}> read more...</span>
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}

BlogCard.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  irr: PropTypes.number.isRequired,
  snippet: PropTypes.string.isRequired,
  src: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
}

export default withStyles(styles, { withTheme: true })(BlogCard)
