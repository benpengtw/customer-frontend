import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Snackbar, withStyles } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 0,
    paddingBottom: 0,
  },
})

class ConsecutiveSnackbars extends PureComponent {
  queue = []

  state = {
    open: false,
    messageInfo: {},
  }

  componentDidMount() {
    const { getPushMessageFromChild } = this.props
    /**
     * Pass the function to parent, so it can use it.
     */
    getPushMessageFromChild(this.pushMessage)
  }

  pushMessage = (message) => {
    const { open } = this.state
    this.queue.push({
      message,
      key: new Date().getTime(),
    })
    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false })
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      })
    }
  }

  handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { messageInfo, open } = this.state
    return (
      <Snackbar
        disableWindowBlurListener
        key={messageInfo.key}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        onExited={this.processQueue}
        ContentProps={{
          classes: {
            root: classes.root,
          },
        }}
        //message={<span>{messageInfo.message ? messageInfo.message.text : null}</span>}
      >
        <Alert severity={messageInfo.message ? messageInfo.message.severity : 'success'} onClose={this.handleClose}>
          {messageInfo.message ? messageInfo.message.text : null}
        </Alert>
      </Snackbar>
    )
  }
}

ConsecutiveSnackbars.propTypes = {
  getPushMessageFromChild: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ConsecutiveSnackbars)
