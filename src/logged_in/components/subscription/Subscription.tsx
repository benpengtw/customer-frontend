import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { List, Divider, Paper, withStyles } from '@material-ui/core'
import SubscriptionTable from './SubscriptionTable'
import SubscriptionInfo from './SubscriptionInfo'
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

function Subscription(props) {
  const { classes, selectSubscription } = props
  let store = useStores()
  const { userStore } = store
  useEffect(() => {
    userStore.getMyProjectOrderList({
      payload: {
        sort: 'ASC',
      },
    })
  }, [])
  useEffect(selectSubscription, [selectSubscription])
  return useObserver(() => (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo testTitle={userStore.currentUser.email} />
        <Divider className={classes.divider} />
        <SubscriptionTable projectOrderList={toJS(userStore.projectOrderList)} />
      </List>
    </Paper>
  ))
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  selectSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(Subscription)
