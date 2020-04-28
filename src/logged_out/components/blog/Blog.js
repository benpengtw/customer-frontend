import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles } from '@material-ui/core'
import BlogCard from './BlogCard'
import LazyLoad from 'react-lazyload'
import BlogHeadSection from './BlogHeadSection'

const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    marginTop: '-80px',
    maxWidth: 1280,
    width: '100%',
  },
  wrapper: {
    minHeight: '60vh',
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
})

function getVerticalBlogPosts(width, blogPosts) {
  const gridRows = [[], [], []]
  let rows
  let xs
  if (isWidthUp('md', width)) {
    rows = 3
    xs = 4
  } else if (isWidthUp('sm', width)) {
    rows = 2
    xs = 6
  } else {
    rows = 1
    xs = 12
  }
  blogPosts.forEach((blogPost, index) => {
    gridRows[index % rows].push(
      <Grid key={blogPost.id} item xs={12}>
        <Box mb={3}>
          <LazyLoad height={900} offset={100}>
            <BlogCard
              src={blogPost.imageSrc}
              title={blogPost.title}
              titleText={blogPost.titleText}
              date={blogPost.date}
              startDate={blogPost.startDate}
              endDate={blogPost.endDate}
              irr={blogPost.irr}
              url={blogPost.url}
              totalAmount={blogPost.totalAmount}
              content={blogPost.content}
              percent={blogPost.percent}
              repaymentType={blogPost.repaymentType}
            />
          </LazyLoad>
        </Box>
      </Grid>
    )
  })
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ))
}

function Blog(props) {
  const { classes, width, blogPosts, selectBlog } = props

  useEffect(() => {
    selectBlog()
  }, [selectBlog])

  return (
    <Fragment>
      <BlogHeadSection />

      <Box display="flex" justifyContent="center" className={classNames(classes.wrapper, 'lg-p-top')}>
        <div className={classes.blogContentWrapper}>
          <Grid container spacing={5}>
            {getVerticalBlogPosts(width, blogPosts)}
          </Grid>
        </div>
      </Box>
    </Fragment>
  )
}

Blog.propTypes = {
  selectBlog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  blogposts: PropTypes.arrayOf(PropTypes.object),
}

export default withWidth()(withStyles(styles, { withTheme: true })(Blog))
