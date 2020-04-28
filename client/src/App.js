import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './component/Layout/Navbar'
import Landing from './component/Layout/Landing'
import Login from './component/auth/Login'
import Register from './component/auth/Register'

const App = () => {
  return (
    <>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </>
  )
}

export default App
