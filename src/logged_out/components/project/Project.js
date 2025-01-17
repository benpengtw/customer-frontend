import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
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
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(4),
    },
    marginTop: '-80px',
    // maxWidth: 1280,
    // width: '100%',
  },
  wrapper: {
    minHeight: '60vh',
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
})

function getVerticalProjectPosts(width, projectList) {
  const gridRows = [[], [], []]
  let rows
  let xs
  if (isWidthUp('md', width)) {
    rows = 2
    xs = 6
  } else if (isWidthUp('sm', width)) {
    rows = 2
    xs = 6
  } else if (isWidthUp('lg', width)) {
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
      <Grid key={projectPost.id} item xs={xs}>
        <Box mb={3} marginTop={6}>
          <LazyLoad height={900} offset={100}>
            <ProjectCard
              src={projectPost.imageSrc}
              title={projectPost.title}
              titleText={projectPost.title}
              startDate={projectPost.startDate}
              endDate={projectPost.endDate}
              irr={projectPost.irr}
              //url={'/project/post/' + projectPost.id}
              url={projectPost.url}
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
    <Grid key={element.id} item xs={xs}>
      {element}
    </Grid>
  ))
}

function Project(props) {
  let store = useStores()
  const { userStore } = store
  const { classes, width, selectProject } = props
  const [page, setPage] = React.useState(1)

  const handleChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    selectProject()
  }, [selectProject])

  useEffect(() => {
    userStore.getProject({
      payload: {
        page: page,
      },
    })
  }, [page])
  console.log('ppp', width)
  return useObserver(() => (
    <Fragment>
      <ProjectHeadSection />
      <Box display="flex" justifyContent="center" className={classNames(classes.wrapper, 'lg-p-top')}>
        <div className={classes.projectContentWrapper}>
          <Grid container direction="row" justify="center" alignItems="flex-start" spacing={8}>
            {getVerticalProjectPosts(width, userStore.projectList)}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Pagination count={userStore.pageCount} color="secondary" onChange={handleChange} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Fragment>
  ))
}

Project.propTypes = {
  selectProject: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  projectposts: PropTypes.arrayOf(PropTypes.object),
}

export default withWidth()(withStyles(styles, { withTheme: true })(Project))
