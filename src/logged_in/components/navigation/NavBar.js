import React, { Fragment, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import ReplyIcon from '@material-ui/icons/Reply'
import NavigationDrawer from '../../../shared/components/NavigationDrawer'
import profilePicture from '../../../assets/profilePicture.jpg'
import logo from '../../../assets/logoRed.png'
import { MobXProviderContext, useObserver } from 'mobx-react'
function useStores() {
  return React.useContext(MobXProviderContext)
}

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
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
  drawerPaper: {
    height: '100%vh',
    whiteSpace: 'nowrap',
    border: 0,
    width: theme.spacing(7),
    overflowX: 'hidden',
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      //width: theme.spacing(9),
      width: '200px',
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down('xs')]: {
      borderRadius: '50% !important',
    },
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  textRedTheme: {
    color: '#8a1818',
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  permanentDrawerListItem: {
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
})

function NavBar(props) {
  const { selectedTab, classes, width, currentUserName } = props
  // Will be use to make website more accessible by screen readers
  const links = useRef([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  let store = useStores()
  const { userStore } = store

  //console.log('NavBar', userStore.currentUser.name)
  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true)
  }, [setIsMobileOpen])

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false)
  }, [setIsMobileOpen])

  const clearLoginData = () => {
    //console.log('userStore', userStore.currentUser.name)
    userStore.forgetUser()
    window.localStorage.removeItem('token')
    window.sessionStorage.removeItem('address')
    window.location.reload(true)
  }

  const menuItems = [
    {
      link: '/',
      name: '返回前台',
      onClick: closeMobileDrawer,
      icon: {
        desktop: <ReplyIcon className="text-white" fontSize="small" />,
        mobile: <ReplyIcon className="text-white" />,
      },
    },
    {
      link: '/c/dashboard',
      name: 'Dashboard',
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={selectedTab === 'Dashboard' ? classes.textRedTheme : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: '/c/posts',
      name: '錢包設定',
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountBalanceWalletIcon
            className={selectedTab === 'Posts' ? classes.textRedTheme : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <AccountBalanceWalletIcon className="text-white" />,
      },
    },
    {
      link: '/c/projectOrderList',
      name: '已投資項目',
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountBalanceIcon
            className={selectedTab === 'ProjectOrderList' ? classes.textRedTheme : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <AccountBalanceIcon className="text-white" />,
      },
    },
    {
      link: '/',
      name: '登出',
      onClick: clearLoginData,
      icon: {
        desktop: <PowerSettingsNewIcon className="text-white" fontSize="small" />,
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ]
  return useObserver(() => (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton aria-label="Open Navigation" onClick={openMobileDrawer} color="primary">
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Link to="/" className={classes.noDecoration}>
                <img src={logo} width="120px" alt="" />
              </Link>
            </Hidden>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
            <ListItem disableGutters className={classNames(classes.iconListItem, classes.smBordered)}>
              <Avatar alt="profile picture" src={profilePicture} className={classNames(classes.accountAvatar)} />
              {isWidthUp('sm', width) && (
                <ListItemText
                  className={classes.username}
                  primary={<Typography color="textPrimary">{currentUserName}</Typography>}
                />
              )}
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node
                }}
              >
                <Tooltip title={element.name} placement="right" key={element.name}>
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      links.current[index].click()
                    }}
                    aria-label={element.name === 'Logout' ? 'Logout' : `Go to ${element.name}`}
                  >
                    <ListItemIcon className={classes.justifyCenter}>{element.icon.desktop}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" className="text-white">
                          {element.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  ))
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  currentUserName: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar))
