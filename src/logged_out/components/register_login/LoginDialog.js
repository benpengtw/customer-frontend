import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { TextField, Button, Checkbox, Typography, FormControlLabel, withStyles } from '@material-ui/core'
import FormDialog from '../../../shared/components/FormDialog'
import HighlightedInformation from '../../../shared/components/HighlightedInformation'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import VisibilityPasswordTextField from '../../../shared/components/VisibilityPasswordTextField'
import { observer, inject } from 'mobx-react'
const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:enabled:hover': {
      color: theme.palette.primary.dark,
    },
    '&:enabled:focus': {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: 'auto',
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
})
@inject('authStore')
@observer
class LoginDialog extends PureComponent {
  state = { loading: false, passwordIsVisible: true }

  onVisibilityChange = (isVisible) => {
    this.setState({ passwordIsVisible: isVisible })
  }

  login = () => {
    const { setStatus, history } = this.props
    this.setState({
      loading: true,
    })
    setStatus(null)
    // if (this.loginEmail.value !== 'test@web.com') {
    //   setTimeout(() => {
    //     setStatus('invalidEmail')
    //     this.setState({
    //       loading: false,
    //     })
    //   }, 1500)
    // } else if (this.loginPassword.value !== 'test') {
    //   setTimeout(() => {
    //     setStatus('invalidPassword')
    //     this.setState({
    //       loading: false,
    //     })
    //   }, 1500)
    // } else {
    //   setTimeout(() => {
    //     history.push('/c/dashboard')
    //   }, 150)
    // }

    this.props.authStore.login({
      payload: {
        email: this.loginEmail.value,
        name: this.loginPassword.value,
      },
      history,
    })
  }

  render() {
    const { classes, onClose, openChangePasswordDialog, status, setStatus } = this.props
    const { loading, passwordIsVisible } = this.state
    return (
      <Fragment>
        <FormDialog
          open
          onClose={onClose}
          loading={loading}
          onFormSubmit={(e) => {
            e.preventDefault()
            this.login()
          }}
          hideBackdrop
          headline="會員登入"
          content={
            <Fragment>
              <TextField
                variant="outlined"
                margin="normal"
                error={status === 'invalidEmail'}
                required
                fullWidth
                label="會員信箱"
                inputRef={(node) => {
                  this.loginEmail = node
                }}
                autoFocus
                autoComplete="off"
                type="email"
                onChange={() => {
                  if (status === 'invalidEmail') {
                    setStatus(null)
                  }
                }}
                helperText={status === 'invalidEmail' && '此電子郵件地址未與帳戶關聯。'}
                FormHelperTextProps={{ error: true }}
                defaultValue="mrjhack@hotmail.com"
              />
              <VisibilityPasswordTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={status === 'invalidPassword'}
                label="會員帳號"
                inputRef={(node) => {
                  this.loginPassword = node
                }}
                autoComplete="off"
                onChange={() => {
                  if (status === 'invalidPassword') {
                    setStatus(null)
                  }
                }}
                helperText={
                  status === 'invalidPassword' ? (
                    <span>
                      密碼錯誤。 再試一次，或點擊 <b>&quot;忘記密碼?&quot;</b> 去重設.
                    </span>
                  ) : (
                    ''
                  )
                }
                FormHelperTextProps={{ error: true }}
                onVisibilityChange={this.onVisibilityChange}
                isVisible={passwordIsVisible}
                defaultValue="vance"
              />
              {/* <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    inputRef={(node) => {
                      this.loginRememberMe = node
                    }}
                    color="primary"
                  />
                }
                label={<Typography variant="body1">Remember me</Typography>}
              /> */}
              {status === 'verificationEmailSend' && (
                <HighlightedInformation>我們已將密碼重設信發送至您的電子郵件信箱</HighlightedInformation>
              )}
            </Fragment>
          }
          actions={
            <Fragment>
              <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading} size="large">
                登入
                {loading && <ButtonCircularProgress />}
              </Button>
              <Typography
                align="center"
                className={classNames(classes.forgotPassword, loading ? classes.disabledText : null)}
                color="primary"
                onClick={loading ? null : openChangePasswordDialog}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  // For screenreaders listen to space and enter events
                  if ((!loading && event.keyCode === 13) || event.keyCode === 32) {
                    openChangePasswordDialog()
                  }
                }}
              >
                忘記密碼
              </Typography>
            </Fragment>
          }
        />
      </Fragment>
    )
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
}

export default withRouter(withStyles(styles)(LoginDialog))
