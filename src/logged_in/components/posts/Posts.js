import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import PostContent from './PostContent'
import AddPost from './AddPost'
import {
  Typography,
  Grid,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Checkbox,
  Button,
  Box,
  Paper,
  Toolbar,
  TextField,
  Snackbar,
} from '@material-ui/core'
import ActionPaper from '../../../shared/components/ActionPaper'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import { observer, inject } from 'mobx-react'
const styles = {
  dBlock: { display: 'block' },
  dNone: { display: 'none' },
}
@inject('userStore')
@observer
class Posts extends PureComponent {
  state = {
    addPostPaperOpen: false,
    loading: false,
    address: '',
    snackBarOpen: false,
  }

  componentDidMount() {
    const { selectPosts } = this.props
    selectPosts()
  }

  handleSubmit = () => {
    const { setStatus, history } = this.props
    //setStatus(null)
    let result = /^(0x)\w{40}$/.test(this.addressData.value)
    if (result) {
      this.props.userStore.addWallet({
        payload: {
          address: this.addressData.value,
        },
      })
      this.setState({
        address: this.addressData.value,
        snackBarOpen: this.props.userStore.snackBarOpen,
      })
    } else {
      //setStatus('invalidAddress')
      console.log('oh NOOO')
    }
    // console.log('ee', this.addressData.value)
    // this.props.userStore.addWallet({
    //   payload: {
    //     address: this.addressData.value,
    //   },
    // })
    // this.setState({
    //   address: this.addressData.value,
    //   loading: this.props.userStore.isLoadingAddress,
    //   snackBarOpen: this.props.userStore.snackBarOpen,
    // })
  }

  handleSnackbarClose = () => {
    this.setState({ snackBarOpen: false })
  }

  render() {
    const { loading, address, snackBarOpen, setStatus, status } = this.state
    const { classes, userStore } = this.props
    // console.log('loading', loading)
    console.log('isLoadingAddress', userStore.isLoadingAddress)
    return (
      <Paper>
        <Snackbar
          open={snackBarOpen}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message="I love snacks"
        />
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
                    error={status === 'invalidAddress'}
                    inputRef={(node) => {
                      this.addressData = node
                    }}
                    id="my-input"
                    label="Wallet Address"
                    aria-describedby="my-helper-text"
                    helperText={status === 'invalidAddress' && '此電子郵件地址未與帳戶關聯。'}
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

Posts.propTypes = {
  setStatus: PropTypes.func.isRequired,
}

export default Posts
