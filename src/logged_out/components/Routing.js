import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PropsRoute from '../../shared/components/PropsRoute'
import Home from './home/Home'
import Blog from './blog/Blog'
import BlogPost from './blog/BlogPost'

function Routing(props) {
  const { blogPosts, selectBlog, selectHome, oneInvestAmount } = props
  return (
    <Switch>
      {blogPosts.map((post, index) => {
        if (index != 0) {
          return (
            <PropsRoute
              /* We cannot use the url here as it contains the get params */
              path={post.url}
              component={BlogPost}
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
              otherArticles={blogPosts.filter((blogPost) => blogPost.id !== post.id)}
            />
          )
        } else {
          return (
            <PropsRoute
              /* We cannot use the url here as it contains the get params */
              path={post.url}
              component={BlogPost}
              title={post.title}
              titleText={post.titleText}
              date={post.date}
              src={post.imageSrc}
              startDate={post.startDate}
              endDate={post.endDate}
              irr={post.irr}
              totalAmount={post.totalAmount}
              content={post.content}
              percent={(oneInvestAmount * 30) / 136900}
              totalAmount={post.totalAmount}
              key={post.id}
              id={post.id}
              otherArticles={blogPosts.filter((blogPost) => blogPost.id !== post.id)}
            />
          )
        }
      })}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
        oneInvestAmount={oneInvestAmount}
      />
      )
      <PropsRoute path="/" component={Home} selectHome={selectHome} />)
    </Switch>
  )
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
  oneInvestAmount: PropTypes.number,
}

export default memo(Routing)
