import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AOS from 'aos/dist/aos'
import { withStyles } from '@material-ui/core'
import NavBar from './navigation/NavBar'
import Footer from './footer/Footer'
import 'aos/dist/aos.css'
import CookieRulesDialog from './cookies/CookieRulesDialog'
import CookieConsent from './cookies/CookieConsent'
import dummyProjectPosts from '../dummy_data/projectPosts'
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
    projectPosts: [],
    dialogOpen: null,
    cookieRulesDialogOpen: false,
  }

  projectPostsMaxUnix = Math.round(new Date().getTime() / 1000)

  componentDidMount() {
    //this.props.userStore.getProject()
    if (localStorage.getItem('token')) {
      this.props.userStore.getMe()
    }
    this.fetchProjectPosts()
  }

  selectHome = () => {
    smoothScrollTop()
    document.title = 'WG金融平台'
    this.setState({ selectedTab: 'Home' })
  }

  selectProject = () => {
    smoothScrollTop()
    document.title = 'WG金融平台 - Project'
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

  fetchProjectPosts = () => {
    /**
     * You would fetch this from the server, however we gonna use the example values from state here
     */
    //this.projectPostsMaxUnix = dummyProjectPosts[dummyProjectPosts.length - 1].date
    const projectPosts = dummyProjectPosts.map((projectPost) => {
      // let title = projectPost.title
      // title = title.toLowerCase()
      // /* Remove unwanted characters, only accept alphanumeric and space */
      // title = title.replace(/[^A-Za-z0-9 ]/g, '')
      // /* Replace multi spaces with a single space */
      // title = title.replace(/\s{2,}/g, ' ')
      // /* Replace space with a '-' symbol */
      // title = title.replace(/\s/g, '-')
      projectPost.url = `/project/post/${projectPost.id}`
      projectPost.params = `?id=${projectPost.id}`
      return projectPost
    })
    this.setState({
      projectPosts,
    })
  }

  handleCookieRulesDialogOpen = () => {
    this.setState({ cookieRulesDialogOpen: true })
  }

  handleCookieRulesDialogClose = () => {
    this.setState({ cookieRulesDialogOpen: false })
  }

  render() {
    const { classes, userStore } = this.props
    const { selectedTab, mobileDrawerOpen, projectPosts, dialogOpen, cookieRulesDialogOpen } = this.state
    console.log('sss', userStore.currentUser.name)
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
        <Routing projectPosts={projectPosts} selectHome={this.selectHome} selectProject={this.selectProject} />
        <Footer />
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Main)
