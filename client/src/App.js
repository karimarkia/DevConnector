import React, { useEffect } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './component/Layout/Navbar'
import Landing from './component/Layout/Landing'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Alert from './component/Layout/Alert'
import Dashboard from './component/Dashboard/Dashboard'
import PrivateRoute from './component/Routing/PrivateRoute'
// Redux
import store from './Store/store'
import  setAuthToken from './utils/setAuthToken'
import { loadUser } from './Store/actions/auth'
import ProfileForm from './component/ProfileForm/ProfileForm'
import AddExperience from './component/ProfileForm/AddExperience'
import AddEducation from './component/ProfileForm/AddEducation'

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
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          {/* <PrivateRoute exact path="/create-profile" component={ProfileForm} /> */}
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
      </section>
    </>
  )
}

export default App
