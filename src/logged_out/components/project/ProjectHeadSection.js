import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography, withStyles, withWidth, isWidthUp } from '@material-ui/core'
import WaveBorder from '../../../shared/components/WaveBorder'

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    backgroundColor: '#0054A0',
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none !important',
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
  typographySub: {
    textAlign: 'center',
    color: '#ffffff',
  },
})

function ProjectHeadSection(props) {
  const { classes, theme, width } = props
  return (
    <Fragment>
      <div className={classNames('lg-p-top', classes.wrapper)}>
        <div className={classNames('container-fluid', classes.container)}>
          <Typography variant={isWidthUp('lg', width) ? 'h5' : 'h6'} className={classes.typographySub}>
            遊戲團隊透過分享遊戲智慧財產權的方式，支持者可以支持他們並獲得收益。
          </Typography>
        </div>
      </div>
      <WaveBorder upperColor="#0054A0" lowerColor="#FFFFFF" className={classes.waveBorder} animationNegativeDelay={2} />
    </Fragment>
  )
}

ProjectHeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
}

export default withWidth()(withStyles(styles, { withTheme: true })(ProjectHeadSection))
