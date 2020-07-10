import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import classNames from 'classnames'
import { Typography, Card, Box, withStyles, GridListTile, GridListTileBar, GridList } from '@material-ui/core'
import soldout from '../../../assets/soldout.png'
import timesup from '../../../assets/timesup.png'
import moment from 'moment'
const styles = (theme) => ({
  img: {
    width: '100%',
    height: '160px',
    marginBottom: 4,
    position: 'relative',
    top: '0',
    left: '0',
  },
  imgOver: {
    width: '100%',
    height: '160px',
    marginBottom: 4,
    position: 'absolute',
    top: '0',
    left: '0',
  },
  card: {
    boxShadow: theme.shadows[2],
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
})

const thousands_separators = (num) => {
  let num_parts = num
    //.toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

function ProjectCardOld(props) {
  const { classes, url, src, title, endDate, totalAmount, investAmount } = props
  const [IFendDate, setIFendDate] = React.useState(false)
  const [IFfullPercent, setIFfullPercent] = React.useState(false)
  React.useEffect(() => {
    if (moment().isAfter(moment(endDate, 'YYYY-MM-DD'))) {
      setIFendDate(true)
    }
    if (investAmount >= totalAmount) {
      setIFfullPercent(true)
    }
    //console.log('dddddd', moment(endDate, 'YYYY-MM-DD').isValid())
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
    <Card className={classes.card}>
      <GridList cellHeight={'auto'}>
        {src && (
          <GridListTile key={src} style={{ height: 'auto', padding: '0px', width: '100%' }}>
            <Link to={url} tabIndex={-1}>
              {imgSwitch()}
            </Link>
          </GridListTile>
        )}
      </GridList>
      <Box p={2}>
        <Typography variant="body2" color="textPrimary">
          投資到期日：{endDate.slice(0, 10)}
        </Typography>
        <Link to={url} className={classNames(classes.noDecoration, classes.showFocus)}>
          <Typography variant="h6">
            <span className={classes.title}>{title}</span>
          </Typography>
          <Typography variant="body1" color="textPrimary" letterSpacing={1}>
            募資總額 $ {thousands_separators(totalAmount)} 元
          </Typography>
          <Typography variant="body1" color="primary" letterSpacing={1}>
            已投金額 $ {thousands_separators(investAmount)} 元
          </Typography>
        </Link>
      </Box>
    </Card>
  )
}

ProjectCardOld.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  title: PropTypes.string,
  totalAmount: PropTypes.number,
  investAmount: PropTypes.number,
  src: PropTypes.string,
  endDate: PropTypes.string,
}

export default withStyles(styles, { withTheme: true })(ProjectCardOld)
