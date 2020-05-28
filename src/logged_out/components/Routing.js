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
  return useObserver(() => (
    <Switch>
      {projectPosts.map((post, index) => {
        // return (
        //   <PropsRoute
        //     path={post.url}
        //     component={ProjectPost}
        // title={post.title}
        // titleText={post.titleText}
        // date={post.date}
        // src={post.imageSrc}
        // startDate={post.startDate}
        // endDate={post.endDate}
        // irr={post.irr}
        // totalAmount={post.totalAmount}
        // content={post.content}
        // percent={post.percent}
        // totalAmount={post.totalAmount}
        // key={post.id}
        // id={post.id}
        // otherArticles={projectPosts.filter((projectPost) => projectPost.id !== post.id)}
        //   />
        // )
      })}
      {userStore.projectList.map((post, index) => {
        //console.log('url', '/project/post/' + post.id)
        return (
          <PropsRoute
            //path={'/project/post/5'}
            path={'/project/post/' + post.id}
            component={ProjectPost}
            // title={post.title}
            // titleText={post.titleText}
            // date={post.date}
            // src={post.imageSrc}
            // startDate={post.startDate}
            // endDate={post.endDate}
            // irr={post.irr}
            // totalAmount={post.totalAmount}
            // content={post.content}
            // percent={post.percent}
            // totalAmount={post.totalAmount}
            // key={post.id}
            // id={post.id}
            //     otherArticles={projectPosts.filter((projectPost) => projectPost.id !== post.id)}
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
