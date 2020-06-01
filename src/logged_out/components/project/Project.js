import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles } from '@material-ui/core'
import ProjectCard from './ProjectCard'
import LazyLoad from 'react-lazyload'
import ProjectHeadSection from './ProjectHeadSection'
import { MobXProviderContext, useObserver, Observer } from 'mobx-react'
import { toJS, computed, reaction } from 'mobx'
function useStores() {
  return React.useContext(MobXProviderContext)
}
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

function getVerticalProjectPosts(width, projectPosts, projectList) {
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
  const projectListData = toJS(projectList)
  //console.log('aaa', projectListData)
  projectListData.map((projectPost, index) => {
    //console.log('bbb', projectPost)
    gridRows[index % rows].push(
      <Grid key={projectPost.id} item xs={12}>
        <Box mb={3}>
          <LazyLoad height={900} offset={100}>
            <ProjectCard
              src={projectPost.imageSrc}
              title={projectPost.title}
              titleText={projectPost.title}
              startDate={projectPost.startDate}
              endDate={projectPost.endDate}
              irr={projectPost.irr}
              url={'/project/post/' + projectPost.id}
              totalAmount={projectPost.totalAmount}
              investAmount={projectPost.investAmount}
              percent={projectPost.percent}
              repaymentType={projectPost.repaymentType}
            />
          </LazyLoad>
        </Box>
      </Grid>
    )
  })
  return gridRows.map((element, index) => (
    <Observer>
      {() => (
        <Grid key={element.id} item xs={xs}>
          {element}
        </Grid>
      )}
    </Observer>
  ))
}

function Project(props) {
  let store = useStores()
  const { userStore } = store
  const { classes, width, projectPosts, selectProject } = props

  useEffect(() => {
    selectProject()
  }, [selectProject])
  console.log('ooo', projectPosts)
  return (
    <Fragment>
      <ProjectHeadSection />

      <Box display="flex" justifyContent="center" className={classNames(classes.wrapper, 'lg-p-top')}>
        <div className={classes.projectContentWrapper}>
          <Grid container spacing={5}>
            {getVerticalProjectPosts(width, projectPosts, userStore.projectList)}
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
