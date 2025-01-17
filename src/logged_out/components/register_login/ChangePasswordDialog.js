import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TextField, Dialog, DialogContent, DialogActions, Button, Typography, withStyles } from '@material-ui/core'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'

const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
})

class ChangePassword extends PureComponent {
  state = { loading: false }

  sendPasswordEmail = () => {
    const { setLoginStatus, onClose } = this.props
    this.setState({ loading: true })
    setTimeout(() => {
      setLoginStatus('verificationEmailSend')
      this.setState({ loading: false })
      onClose()
    }, 1500)
  }

  render() {
    const { onClose, classes } = this.props
    const { loading } = this.state
    return (
      <Dialog
        open
        hideBackdrop
        onClose={onClose}
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
        maxWidth="xs"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.sendPasswordEmail()
          }}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography paragraph>輸入您註冊的郵箱，我們將向您發送有關如何重設密碼的信息。</Typography>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="會員信箱"
              autoFocus
              type="email"
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={onClose} disabled={loading}>
              取消
            </Button>
            <Button type="submit" variant="contained" color="secondary" disabled={loading}>
              重設密碼
              {loading && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setLoginStatus: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(ChangePassword)
