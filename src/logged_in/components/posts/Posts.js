import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, FormControl, Button, Box, Paper, Toolbar, TextField, Snackbar } from '@material-ui/core'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import { observer, inject, useObserver } from 'mobx-react'
const styles = {
  dBlock: { display: 'block' },
  dNone: { display: 'none' },
}
@inject('userStore')
@observer
class Posts extends PureComponent {
  state = {
    addPostPaperOpen: false,
    address: '',
    validStatus: null,
  }

  componentDidMount() {
    const { selectPosts } = this.props
    this.props.userStore.getMe()
    selectPosts()
  }

  setValidStatus = (validStatus) => {
    this.setState({ validStatus })
  }

  handleSubmit = () => {
    this.setValidStatus(null)
    const { userStore } = this.props
    let result = /^(0x)\w{40}$/.test(this.addressData.value)
    if (result) {
      userStore.addWallet({
        payload: {
          address: this.addressData.value,
        },
      })
    } else {
      this.setValidStatus('invalidAddress')
    }
  }

  render() {
    const { address, validStatus, open } = this.state
    const { classes, userStore, pushMessageToSnackbar } = this.props
    //console.log('isLoadingAddress', userStore)

    const printSnackbar = () => {
      if (userStore.snackSuccess == 'failed') {
        userStore.initSnackSuccess()
        pushMessageToSnackbar({
          text: userStore.errorMessage,
          severity: 'error',
        })
      } else if (userStore.snackSuccess == 'success') {
        userStore.initSnackSuccess()
        pushMessageToSnackbar({
          text: 'Success!',
          severity: 'success',
        })
      } else {
        return null
      }
    }

    return (
      <Paper>
        {printSnackbar()}
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">付款錢包設定</Typography>
        </Toolbar>
        <Box p={4}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              this.handleSubmit(e)
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    error={validStatus === 'invalidAddress'}
                    inputRef={(node) => {
                      this.addressData = node
                    }}
                    id="my-input"
                    onChange={() => {
                      if (validStatus === 'invalidAddress') {
                        this.setValidStatus(null)
                      }
                    }}
                    label="Wallet Address"
                    defaultValue={window.sessionStorage.getItem('address')}
                    aria-describedby="my-helper-text"
                    helperText={validStatus === 'invalidAddress' && '錢包地址格式錯誤'}
                  />
                  {/* <FormHelperText id="my-helper-text">We'll never share your Wallet.</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="secondary">
                  設定錢包 {userStore.isLoadingAddress && <ButtonCircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    )
  }
}

Posts.propTypes = { pushMessageToSnackbar: PropTypes.func }

export default Posts
