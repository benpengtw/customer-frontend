import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, isWidthUp, withWidth } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import BuildIcon from '@material-ui/icons/Build'
import ComputerIcon from '@material-ui/icons/Computer'
import BarChartIcon from '@material-ui/icons/BarChart'
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import CloudIcon from '@material-ui/icons/Cloud'
import MeassageIcon from '@material-ui/icons/Message'
import CancelIcon from '@material-ui/icons/Cancel'
import SecurityIcon from '@material-ui/icons/Security'
import calculateSpacing from './calculateSpacing'
import FeatureCard from './FeatureCard'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import BallotIcon from '@material-ui/icons/Ballot'

const iconSize = 50

const features = [
  {
    color: '#6200EA',
    headline: '遊戲募資平台',
    text: 'Angel Bird 是世界上最受歡迎的遊戲募資平台，配以軍用級別256 位加密技術，為用戶提供無縫式體驗。',
    icon: <BallotIcon style={{ fontSize: iconSize }} />,
    mdDelay: '0',
    smDelay: '0',
  },
  {
    color: '#0091EA',
    headline: '承保的托管機構',
    text: 'Angel Bird 符合 CCSS 3 級和 SOC 2 標準，保證支付加密貨幣時的資產安全。',
    icon: <SecurityIcon style={{ fontSize: iconSize }} />,
    mdDelay: '200',
    smDelay: '200',
  },
  {
    color: '#00C853',
    headline: '監管合規',
    text: 'Angel Bird 遵守全球投資的合規標準，保障雙方的權益。',
    icon: <CheckCircleIcon style={{ fontSize: iconSize }} />,
    mdDelay: '400',
    smDelay: '0',
  },
]

function FeatureSection(props) {
  const { width } = props
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          我們的特色
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map((element) => (
              <Grid
                item
                xs={12}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUp('md', width) ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(FeatureSection)
