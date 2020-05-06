import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Hidden, IconButton, withStyles, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import BookIcon from '@material-ui/icons/Book'
import NavigationDrawer from '../../../shared/components/NavigationDrawer'
import logo from '../../../assets/logoRed.png'
import { MobXProviderContext, useObserver, Observer } from 'mobx-react'
import profilePicture from '../../../assets/profilePicture.jpg'
import classNames from 'classnames'
function useStores() {
  return React.useContext(MobXProviderContext)
}

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    // fontSize: theme.typography.body1.fontSize,
    // fontWeight: theme.typography.h6.fontWeight,
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  button: {
    '&$disabled': {
      color: '#000000de',
    },
    textTransform: 'none',
  },
  disabled: {},
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
})

function NavBar(props) {
  const {
    classes,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab,
    currentUserName,
  } = props
  let store = useStores()
  const { userStore } = store
  const clearLoginData = () => {
    //console.log('userStore', userStore.currentUser.name)
    userStore.forgetUser()
    window.localStorage.removeItem('token')
    window.location.reload(true)
  }

  const menuItems = [
    {
      link: '/',
      name: 'Home',
      icon: <HomeIcon className="text-white" />,
    },
    {
      link: '/blog',
      name: '投資標的',
      icon: <BookIcon className="text-white" />,
    },
    // {
    //   name: 'Register',
    //   onClick: openRegisterDialog,
    //   icon: <HowToRegIcon className="text-white" />,
    // },
    {
      name: '',
      onClick: '',
      icon: <LockOpenIcon className="text-white" />,
    },
    // {
    //   name: 'Logout',
    //   onClick: clearLoginData,
    //   icon: <LockOpenIcon className="text-white" />,
    // },
  ]
  return useObserver(() => (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Link to="/" className={classes.noDecoration}>
              <img src={logo} width="120px" alt="" />
            </Link>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton className={classes.menuButton} onClick={handleMobileDrawerOpen} aria-label="Open Navigation">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map((element) => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ root: classes.button, text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </Link>
                  )
                }
                if (currentUserName) {
                  return (
                    <Fragment key="logged">
                      <Link to={'/c/dashboard'} className={classes.noDecoration}>
                        <Button color="secondary" size="large" classes={{ text: classes.menuButtonText }}>
                          {'會員管理'}
                        </Button>
                      </Link>
                      <Button
                        color="secondary"
                        size="large"
                        onClick={clearLoginData}
                        classes={{ root: classes.button, text: classes.menuButtonText }}
                      >
                        {'Logout'}
                      </Button>
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ root: classes.button, disabled: classes.disabled }}
                        disabled
                      >
                        <Avatar
                          alt="profile picture"
                          src={profilePicture}
                          className={classNames(classes.accountAvatar)}
                        />
                        {currentUserName}
                      </Button>
                    </Fragment>
                  )
                } else {
                  return (
                    <Button
                      color="secondary"
                      size="large"
                      onClick={openLoginDialog}
                      classes={{ text: classes.menuButtonText }}
                      key="Login"
                    >
                      {'Login'}
                    </Button>
                  )
                }
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  ))
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  currentUserName: PropTypes.string.isRequired,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(memo(NavBar))
