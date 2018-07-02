import React, { Component } from 'react';
import '../styles/app.css';
import AuthenticationScreen from './authentication.js';

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h3>User: {}</h3>
        <h1>This is a homepage</h1>
      </div>
    );
  }
}
