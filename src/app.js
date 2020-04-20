import React, { Fragment, Suspense, lazy } from 'react'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './theme'
import GlobalStyles from './GlobalStyles'
import * as serviceWorker from './serviceWorker'
import Pace from './shared/components/Pace'
import { Provider } from 'mobx-react'
import articlesStore from './stores/articlesStore'
import commentsStore from './stores/commentsStore'
import authStore from './stores/authStore'
import commonStore from './stores/commonStore'
import editorStore from './stores/editorStore'
import userStore from './stores/userStore'
import profileStore from './stores/profileStore'
const LoggedInComponent = lazy(() => import('./logged_in/components/Main'))

const LoggedOutComponent = lazy(() => import('./logged_out/components/Main'))
const stores = {
  articlesStore,
  commentsStore,
  authStore,
  commonStore,
  editorStore,
  userStore,
  profileStore,
}

function App() {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                <LoggedInComponent />
              </Route>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

serviceWorker.register()

export default App
