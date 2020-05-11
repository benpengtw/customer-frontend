import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Typography, Card, Button, Hidden, Box, withStyles, withWidth, isWidthUp } from '@material-ui/core'
import headerImage from '../../dummy_data/images/headerImage.png'
import WaveBorder from '../../../shared/components/WaveBorder'

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    //backgroundImage: `url(${headerImage})`,
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down('lg')]: {
      //width: 'auto',
      width: '80vw',
    },
  },
  wrapper: {
    position: 'relative',
    //backgroundColor: '#0054A0',
    backgroundImage: 'linear-gradient(180deg, rgba(32,188,255,1) 0%, rgba(0,84,160,1) 79%)',
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    width: '80%',
    // borderRadius: theme.shape.borderRadius,
    // boxShadow: theme.shadows[4],
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
    //backgroundImage: `url(${headerImage})`,
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
})

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#37B8AF',
    '&:hover': {
      backgroundColor: '#31a59d',
    },
  },
}))(Button)

function HeadSection(props) {
  const { classes, theme, width } = props
  return (
    <Fragment>
      <div className={classNames('lg-p-top', classes.wrapper)}>
        <div className={classNames('container-fluid')}>
          <Box display="flex" justifyContent="center">
            <Card className={classes.card} data-aos-delay="200" data-aos="zoom-in">
              <div className={classNames(classes.containerFix, 'container')}>
                <Box justifyContent="space-between" className="row">
                  <Hidden smDown>
                    <Grid item md={6}>
                      <img src={headerImage} className={classes.image} alt="header example" />
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                      <Box mb={4}>
                        <Typography variant={isWidthUp('lg', width) ? 'h3' : 'h4'}>
                          防疫期間 您我共同攜手度過難關
                        </Typography>
                      </Box>
                      <div>
                        <Box mb={2}>
                          <Typography variant={isWidthUp('lg', width) ? 'h6' : 'body1'} color="textSecondary">
                            運用您的閒置資金，獲得優於傳統金融的報酬率
                          </Typography>
                        </Box>
                        <ColorButton
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.extraLargeButton}
                          //classes={{ label: classes.extraLargeButtonLabel }}
                          href="http://54.64.193.122:83/"
                        >
                          立即申請
                        </ColorButton>
                      </div>
                    </Box>
                  </Grid>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder upperColor="#0054A0" lowerColor="#FFFFFF" className={classes.waveBorder} animationNegativeDelay={2} />
    </Fragment>
  )
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
}

export default withWidth()(withStyles(styles, { withTheme: true })(HeadSection))
