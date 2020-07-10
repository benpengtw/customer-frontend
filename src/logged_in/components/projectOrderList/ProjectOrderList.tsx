import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { List, Divider, Paper, withStyles } from '@material-ui/core'
import ProjectOrderListTable from './ProjectOrderListTable'
import ProjectOrderListInfo from './ProjectOrderListInfo'
import { MobXProviderContext, useObserver } from 'mobx-react'
import { toJS } from 'mobx'
function useStores() {
  return React.useContext(MobXProviderContext)
}

const styles = {
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
  },
}

function ProjectOrderList(props) {
  const { classes, selectProjectOrderList } = props
  let store = useStores()
  const { userStore } = store
  useEffect(() => {
    userStore.getMyProjectOrderList({
      payload: {
        sort: 'ASC',
      },
    })
  }, [])
  useEffect(selectProjectOrderList, [selectProjectOrderList])
  return useObserver(() => (
    <Paper>
      <List disablePadding>
        <ProjectOrderListInfo testTitle={userStore.currentUser.email} />
        <Divider className={classes.divider} />
        <ProjectOrderListTable projectOrderList={toJS(userStore.projectOrderList)} />
      </List>
    </Paper>
  ))
}

ProjectOrderList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectProjectOrderList: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectOrderList)
