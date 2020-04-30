import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import PostContent from './PostContent'
import AddPost from './AddPost'
import { Typography, TextField, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
class Posts extends PureComponent {
  state = {
    addPostPaperOpen: false,
  }

  componentDidMount() {
    const { selectPosts } = this.props
    selectPosts()
  }

  openAddPostModal = () => {
    this.setState({ addPostPaperOpen: true })
  }

  closeAddPostModal = () => {
    this.setState({ addPostPaperOpen: false })
  }

  render() {
    const { addPostPaperOpen, addPostModalOpen } = this.state
    const { EmojiTextArea, ImageCropper, Dropzone, DateTimePicker, pushMessageToSnackbar, posts } = this.props
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="fname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="lname" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="city" name="city" label="City" fullWidth autoComplete="billing address-level2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="country" name="country" label="Country" fullWidth autoComplete="billing country" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

Posts.propTypes = {
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
}

export default Posts
