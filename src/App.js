import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './utils/history'

import './styles/index.css'

import {
  Home,
  Login,
  Bills,
  CreateBill,
  EditBill,
  Business,
  CreateBusiness,
  EditBusiness
} from './wrappedComponents'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bills" component={Bills} />
          <Route exact path="/bills/new" component={CreateBill} />
          <Route exact path="/bills/edit/:id" component={EditBill} />
          <Route exact path="/business" component={Business} />
          <Route exact path="/business/new" component={EditBusiness} />
          <Route exact path="/business/edit/:id" component={CreateBusiness} />
        </Switch>
      </Router>
    )
  }
}

export default App
