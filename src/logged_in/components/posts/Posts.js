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
    address: '',
    snackBarOpen: false,
    validStatus: null,
  }

  componentDidMount() {
    const { selectPosts } = this.props
    selectPosts()
  }

  setValidStatus = (validStatus) => {
    this.setState({ validStatus })
  }

  handleSubmit = () => {
    this.setValidStatus(null)
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
      this.setValidStatus('invalidAddress')
      console.log('oh NOOO')
    }
  }

  handleSnackbarClose = () => {
    this.setState({ snackBarOpen: false })
  }

  render() {
    const { address, snackBarOpen, validStatus } = this.state
    const { classes, userStore } = this.props
    //console.log('isLoadingAddress', this.state)
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

Posts.propTypes = {}

export default Posts
