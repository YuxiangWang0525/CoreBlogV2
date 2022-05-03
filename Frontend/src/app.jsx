import React, { useState } from 'react'
import {
  BrowserRouter, Switch, Route, Link, useHistory, useRouteMatch
} from 'react-router-dom'
import { Button } from '@mui/material'

import MainAppBar from './components/app-bar.jsx'
import Language from './views/language.jsx'
import Login from './views/login.jsx'
import Index from './views/index-page.jsx'
import BlogRead from './views/blog-read.jsx'
import About from './views/about.jsx'
import UserContext from './components/user-context'
import { getLocalStorage } from './utils/localStorage'
import BlogEdit from './views/blog-edit.jsx'

const initUserInfo = JSON.parse(getLocalStorage('User.Info'))

const App = () => {
  const history = useHistory()
  const [user, setUser] = useState(initUserInfo)
  const matchIndex = useRouteMatch({
    path: '/',
    strict: true,
    exact: true
  })
  const matchEdit = useRouteMatch({
    path: '/edit',
    strict: true,
    exact: true
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <MainAppBar />
        <div style={{
          display: 'flex', justifyContent: 'center', paddingLeft: 20, paddingRight: 20
        }}>
          <div style={{
            marginTop: 14, marginBottom: 20, maxWidth: 1000, width: 'calc(100% - 20px)'
          }}>
            { <Index display={matchIndex} /> }
            { <BlogEdit display={matchEdit} /> }
            <Switch>
              <Route exact path="/blog/:blogId">
                <BlogRead />
              </Route>
              <Route exact path="/login">
                <Login history={history} />
              </Route>
              <Route exact path="/language">
                <Language />
              </Route>
              <Route exact path="/logged-out">
                <div>You were logged out, damn it</div>
                <Link to="/login">
                  <Button variant="contained">Goto log-in</Button>
                </Link>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
