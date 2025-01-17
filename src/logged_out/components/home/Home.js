import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import HeadSection from './HeadSection'
import FeatureSection from './FeatureSection'
import PricingSection from './PricingSection'

function Home(props) {
  const { selectHome, openLoginDialog } = props
  useEffect(() => {
    selectHome()
  }, [selectHome])
  return (
    <Fragment>
      <HeadSection openLoginDialog={openLoginDialog} />
      <FeatureSection />
      <PricingSection />
    </Fragment>
  )
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
}

export default Home
