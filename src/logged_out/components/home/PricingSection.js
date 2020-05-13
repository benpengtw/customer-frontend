import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Typography, isWidthUp, withWidth, withStyles, Box } from '@material-ui/core'
//import PriceCard from './PriceCard'
import calculateSpacing from './calculateSpacing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faSlideshare } from '@fortawesome/free-brands-svg-icons'
import { faUserShield } from '@fortawesome/free-solid-svg-icons'

const styles = (theme) => ({
  containerFix: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: 'hidden',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cardWrapper: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 340,
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 360,
    },
  },
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  cardHightlighted: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    color: theme.palette.primary.main,
  },
})

function PricingSection(props) {
  const { width, classes } = props
  return (
    <div className="lg-p-top" style={{ backgroundColor: '#FFFFFF' }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        我們的優勢
      </Typography>
      <div className={classNames('container-fluid', classes.containerFix)}>
        <Grid container spacing={calculateSpacing(width)} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} lg={4} className={classes.cardWrapper} data-aos="zoom-in-up">
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} size="lg" color="#3d40a2" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    管理團隊經驗豐富
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    非一般個體經營的小公司，安全又專業，免費提供專業不動產諮詢服務。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faSlideshare} size="lg" color="#fa8072" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    WGpay與您一起共享經濟
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    透過金融科技與專業審查，降低投資方及借貸方風險，，共創三方共贏新局面。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '400' : '0'}
          >
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faUserShield} size="lg" color="#4bb393" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    嚴格把關，合法安心
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    媒合過程符合台灣法令規定，WGpay擁有最優質的服務。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '600' : '200'}
          >
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} size="lg" color="#ff9a00" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    交易資訊透明公開
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    「透明化、公開化」是交易安全的重要基礎，資訊透明公開，安心合法。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '800' : '200'}
          >
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" color="#49b6bb" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    投資低風險
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    分散投資、低門檻，人人都可輕鬆擁抱不動產市場債權收益。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={4}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '1000' : '200'}
          >
            <div className={classes.card}>
              <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <FontAwesomeIcon icon={faChartLine} size="lg" color="#e24978" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    穩健報酬抗漲跌
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1" className={classes.title}>
                    根據歷史經驗，不動產債權收益中長期報酬率優於股.匯.債市。
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(withWidth()(PricingSection))
