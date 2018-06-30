import React, { Component } from 'react';
import '../styles/app.css';
import AuthenticationScreen from './authentication.js';
import HomePage from './homepage.js';
import Header from './header.js';

import {Router, Switch, Route} from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/login" component={AuthenticationScreen} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
