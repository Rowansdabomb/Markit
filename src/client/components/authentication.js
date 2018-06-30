import React, { Component } from 'react'

import axios from 'axios'


const query = `
  mutation Signup($email: String, $password: String, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      name
    }
  }
`

const LOGIN = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`

const HELLO = `
  query {
    hello
  }
`

class AuthenticationScreen extends Component {
  constructor(props) {
    super(props)
    this.state=({
      name: '',
      email: '',
      password: '',
      // passwordConfirm: '',
      authType: 'Login'
    })
  }

  onChange(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  onClick() {
    const {email, password, name} = this.state
    console.log(this.state.authType)
    if (this.state.authType === 'Signup') {
      fetch('/api', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            email,
            password,
            name
          }
        })
      }).then(r => r.json())
      .then(data => console.log('data returned:', data));
    } else if (this.state.authType === 'Login') {
      // query for login
      axios.post('/api', {query: HELLO})
      .then(result => console.log(result))
    } else {
      // error
      console.log('error: authType must be login or signup')
    }
  }

  onTestSignup() {
    var email = 'aaa';
    var password = 'aaa';
    var name = 'aaa';
    var query = `mutation CreateMessage($input: UserData) {
      createUser(input: $input) {
        name
      }
    }`;

    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            email,
            password,
            name
          }
        }
      })
    })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
  }

  toggleScreenType() {
    this.setState(prevState => ({
      authType: prevState.authType === 'Login' ? 'Signup' : 'Login'
    }))
  }

  renderLogin() {
    return (
      <div className='auth-div'>
        <h3>Email</h3>
        <input 
          name="email" 
          type="text" 
          value={this.state.email} 
          onChange={(e) => this.onChange(e)}/>
        <h3>Password</h3>
        <input 
          name="password" 
          type="text" 
          value={this.state.password}
          onChange={(e) => this.onChange(e)}/>
        <button onClick={() => {this.onClick()}}>Submit</button>
      </div>
    )
  }

  renderSignup() {
    return (
      <div className='auth-div'>
        <h3>Name</h3>
        <input 
          name="name" 
          type="text" 
          value={this.state.name} 
          onChange={(e) => this.onChange(e)}/>
        <h3>Email</h3>
        <input 
          name="email" 
          type="text" 
          value={this.state.email} 
          onChange={(e) => this.onChange(e)}/>
        <h3>Password</h3>
        <input 
          name="password" 
          type="text" 
          value={this.state.password}
          onChange={(e) => this.onChange(e)}/>
        <h3>Password Confirmation</h3>
        {/* <input 
          name="passwordConfirm" 
          type="text" 
          value={this.state.passwordConfirm} 
          onChange={(e) => this.onChange(e)}/> */}
        <button onClick={() => {this.onClick()}}>Submit</button>
      </div>
    )
  }

  render() {
    return (
      <div className='auth-div-container'>
        <h1>{this.props.authType}</h1>
        {this.state.authType === 'Login' ? this.renderLogin(): this.renderSignup()}
        <button 
          className='button' 
          onClick={() => {this.toggleScreenType()}} >
          {this.state.authType === 'Login' ? 'Signup' : 'Login'}
        </ button>
        <button onClick={()=>{this.onClick()}}>Test Query</button>
        <button onClick={()=>{this.onTestSignup()}}>Test Signup</button>
      </div>
    )
  }
}

export default AuthenticationScreen