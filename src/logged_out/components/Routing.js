import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PropsRoute from '../../shared/components/PropsRoute'
import Home from './home/Home'
import Project from './project/Project'
import ProjectPost from './project/ProjectPost'
import { MobXProviderContext, useObserver, Observer, useLocalStore } from 'mobx-react'
import { toJS, computed, reaction } from 'mobx'
function useStores() {
  return React.useContext(MobXProviderContext)
}

function Routing(props) {
  let store = useStores()
  const { userStore } = store
  const { selectProject, selectHome, openLoginDialog, pushMessageToSnackbar } = props
  //console.log('sdsdsdsd', toJS(userStore.projectList))
  return useObserver(() => (
    <Switch>
      <PropsRoute path="/project/post/:id" component={ProjectPost} pushMessageToSnackbar={pushMessageToSnackbar} />
      <PropsRoute exact path="/project" component={Project} selectProject={selectProject} />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} openLoginDialog={openLoginDialog} />)
    </Switch>
  ))
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
}

export default memo(Routing)
