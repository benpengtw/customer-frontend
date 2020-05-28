import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles } from '@material-ui/core'
import ProjectCard from './ProjectCard'
import LazyLoad from 'react-lazyload'
import ProjectHeadSection from './ProjectHeadSection'

const styles = (theme) => ({
  projectContentWrapper: {
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

function getVerticalProjectPosts(width, projectPosts) {
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
  projectPosts.forEach((projectPost, index) => {
    gridRows[index % rows].push(
      <Grid key={projectPost.id} item xs={12}>
        <Box mb={3}>
          <LazyLoad height={900} offset={100}>
            <ProjectCard
              src={projectPost.imageSrc}
              title={projectPost.title}
              titleText={projectPost.titleText}
              date={projectPost.date}
              startDate={projectPost.startDate}
              endDate={projectPost.endDate}
              irr={projectPost.irr}
              url={projectPost.url}
              totalAmount={projectPost.totalAmount}
              content={projectPost.content}
              percent={projectPost.percent}
              repaymentType={projectPost.repaymentType}
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

function Project(props) {
  const { classes, width, projectPosts, selectProject } = props

  useEffect(() => {
    selectProject()
  }, [selectProject])

  return (
    <Fragment>
      <ProjectHeadSection />

      <Box display="flex" justifyContent="center" className={classNames(classes.wrapper, 'lg-p-top')}>
        <div className={classes.projectContentWrapper}>
          <Grid container spacing={5}>
            {getVerticalProjectPosts(width, projectPosts)}
          </Grid>
        </div>
      </Box>
    </Fragment>
  )
}

Project.propTypes = {
  selectProject: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  projectposts: PropTypes.arrayOf(PropTypes.object),
}

export default withWidth()(withStyles(styles, { withTheme: true })(Project))
