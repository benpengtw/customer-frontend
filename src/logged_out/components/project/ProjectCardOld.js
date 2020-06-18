import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import classNames from 'classnames'
import { Typography, Card, Box, withStyles } from '@material-ui/core'

const styles = (theme) => ({
  img: {
    width: '100%',
    height: '160px',
    marginBottom: 8,
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
  return (
    <Card className={classes.card}>
      {src && (
        <Link to={url} tabIndex={-1}>
          <img src={src} className={classes.img} alt="" />
        </Link>
      )}
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
