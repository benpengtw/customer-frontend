import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AOS from 'aos/dist/aos'
import { withStyles } from '@material-ui/core'
import NavBar from './navigation/NavBar'
import Footer from './footer/Footer'
import 'aos/dist/aos.css'
import CookieRulesDialog from './cookies/CookieRulesDialog'
import CookieConsent from './cookies/CookieConsent'
//import dummyProjectPosts from '../dummy_data/projectPosts'
import ConsecutiveSnackbarMessages from '../../shared/components/ConsecutiveSnackbarMessages'
import DialogSelector from './register_login/DialogSelector'
import Routing from './Routing'
import smoothScrollTop from '../../shared/functions/smoothScrollTop'
import { observer, inject } from 'mobx-react'
AOS.init({ once: true })

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: 'hidden',
  },
})
@inject('userStore')
@observer
class Main extends PureComponent {
  state = {
    selectedTab: null,
    mobileDrawerOpen: false,
    dialogOpen: null,
    cookieRulesDialogOpen: false,
  }

  componentDidMount() {
    // this.props.userStore.getProject({
    //   payload: {
    //     page: 1,
    //   },
    // })
    if (localStorage.getItem('token')) {
      this.props.userStore.getMe()
    }
  }

  selectHome = () => {
    smoothScrollTop()
    document.title = '安喬博德'
    this.setState({ selectedTab: 'Home' })
  }

  selectProject = () => {
    smoothScrollTop()
    document.title = '安喬博德 - Project'
    this.setState({ selectedTab: 'Project' })
  }

  openLoginDialog = () => {
    this.setState({ dialogOpen: 'login', mobileDrawerOpen: false })
  }

  closeDialog = () => {
    this.setState({ dialogOpen: null })
  }

  openRegisterDialog = () => {
    this.setState({
      dialogOpen: 'register',
      mobileDrawerOpen: false,
    })
  }

  openTermsDialog = () => {
    this.setState({ dialogOpen: 'termsOfService' })
  }

  handleMobileDrawerOpen = () => {
    this.setState({ mobileDrawerOpen: true })
  }

  handleMobileDrawerClose = () => {
    this.setState({ mobileDrawerOpen: false })
  }

  switchSelectedTab = (tab) => {
    this.setState({ selectedTab: tab })
  }

  openChangePasswordDialog = () => {
    this.setState({ dialogOpen: 'changePassword' })
  }

  handleCookieRulesDialogOpen = () => {
    this.setState({ cookieRulesDialogOpen: true })
  }

  handleCookieRulesDialogClose = () => {
    this.setState({ cookieRulesDialogOpen: false })
  }

  /**
   * We have to call the pushSnackBarMessage function of this
   * child's consecutiveSnackbarMessages component. Thats why we pass it
   * when the component did mount to this components state.
   */
  getPushMessageFromChild = (pushFunction) => {
    this.pushMessageToSnackbar = pushFunction
  }

  render() {
    const { classes, userStore } = this.props
    const { selectedTab, mobileDrawerOpen, dialogOpen, cookieRulesDialogOpen } = this.state
    return (
      <div className={classes.wrapper}>
        {!cookieRulesDialogOpen && <CookieConsent handleCookieRulesDialogOpen={this.handleCookieRulesDialogOpen} />}
        <DialogSelector
          openLoginDialog={this.openLoginDialog}
          dialogOpen={dialogOpen}
          onClose={this.closeDialog}
          openTermsDialog={this.openTermsDialog}
          openRegisterDialog={this.openRegisterDialog}
          openChangePasswordDialog={this.openChangePasswordDialog}
        />
        <CookieRulesDialog open={cookieRulesDialogOpen} onClose={this.handleCookieRulesDialogClose} />
        <NavBar
          selectedTab={selectedTab}
          selectTab={this.selectTab}
          openLoginDialog={this.openLoginDialog}
          openRegisterDialog={this.openRegisterDialog}
          mobileDrawerOpen={mobileDrawerOpen}
          handleMobileDrawerOpen={this.handleMobileDrawerOpen}
          handleMobileDrawerClose={this.handleMobileDrawerClose}
          currentUserName={userStore.currentUser.name}
        />
        <ConsecutiveSnackbarMessages getPushMessageFromChild={this.getPushMessageFromChild} />
        <Routing
          selectHome={this.selectHome}
          selectProject={this.selectProject}
          openLoginDialog={this.openLoginDialog}
          pushMessageToSnackbar={this.pushMessageToSnackbar}
        />
        <Footer />
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Main)
