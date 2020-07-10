import React from 'react'
import PropTypes from 'prop-types'
import { ListItemText, Button, Toolbar, withStyles } from '@material-ui/core'

const styles = {
  toolbar: {
    justifyContent: 'space-between',
  },
}

function ProjectOrderListInfo(props) {
  const { classes, testTitle } = props
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary={testTitle} secondary="Premium Account" />
    </Toolbar>
  )
}

ProjectOrderListInfo.propTypes = {
  testTitle: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProjectOrderListInfo)
