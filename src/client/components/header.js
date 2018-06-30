import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../styles/header.css';
class Header extends Component {
  render() {
    return (
      <div className="">
        <div className='header-list'>
          <Link to="/" className='header-element'>
            Home
          </Link>
          <div className="">|</div>
          <Link to="/login" className='header-element'>
            Login
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)