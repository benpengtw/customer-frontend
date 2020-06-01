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
  const { projectPosts, selectProject, selectHome } = props
  //console.log('sdsdsdsd', toJS(userStore.projectList))
  return useObserver(() => (
    <Switch>
      {userStore.projectList.map((post, index) => {
        //console.log('post', toJS(post))
        return (
          <PropsRoute
            path={'/project/post/' + post.id}
            component={ProjectPost}
            title={post.title}
            titleText={post.titleText}
            date={1593068400}
            startDate={post.startDate}
            endDate={post.endDate}
            irr={post.irr}
            percent={post.percent}
            totalAmount={post.totalAmount}
            key={post.id}
            id={post.id}
            otherArticles={userStore.projectList.filter((projectPost) => projectPost.id !== post.id)}
          />
        )
      })}
      <PropsRoute exact path="/project" component={Project} selectProject={selectProject} projectPosts={projectPosts} />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} />)
    </Switch>
  ))
}

Routing.propTypes = {
  projectposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
}

export default memo(Routing)
