import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PropsRoute from '../../shared/components/PropsRoute'
import Home from './home/Home'
import Project from './project/Project'
import ProjectPost from './project/ProjectPost'

function Routing(props) {
  const { projectPosts, selectProject, selectHome } = props
  return (
    <Switch>
      {projectPosts.map((post, index) => {
        return (
          <PropsRoute
            /* We cannot use the url here as it contains the get params */
            path={post.url}
            component={ProjectPost}
            title={post.title}
            titleText={post.titleText}
            date={post.date}
            src={post.imageSrc}
            startDate={post.startDate}
            endDate={post.endDate}
            irr={post.irr}
            totalAmount={post.totalAmount}
            content={post.content}
            percent={post.percent}
            totalAmount={post.totalAmount}
            key={post.id}
            id={post.id}
            otherArticles={projectPosts.filter((projectPost) => projectPost.id !== post.id)}
          />
        )
      })}
      <PropsRoute exact path="/project" component={Project} selectProject={selectProject} projectPosts={projectPosts} />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} />)
    </Switch>
  )
}

Routing.propTypes = {
  projectposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
}

export default memo(Routing)
