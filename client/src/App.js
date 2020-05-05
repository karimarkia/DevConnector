import React, { useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './component/Layout/Navbar'
import Landing from './component/Layout/Landing'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Alert from './component/Layout/Alert'
import store from './Store/store'
// Redux
import  setAuthToken from './utils/setAuthToken'
import { loadUser } from './Store/actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </>
  )
}

export default App