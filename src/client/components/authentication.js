import React, { Component } from 'react'
import {fetchGraphQL} from '../helpers'

class AuthenticationScreen extends Component {
  constructor(props) {
    super(props)
    this.state=({
      returnName: '',
      name: '',
      email: '',
      password: '',
      authType: 'Login'
    })
  }

  onChange(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  verifyUser() {
    const query = `query VerifyUser($input: UserData) {
      verifyUser{
        name
        token
        id
      }
    }`;

    fetchGraphQL({
      query,
      variables: {}
    }).then((res) => {
      console.log(res)
      console.log('verifyUser', res.data.verifyUser);
      if(res.error) {
        this.setState({
          returnName: 'Error'
        })
      }
    })
  }

  signup() {
    const {email, password, name} = this.state
    const query = `mutation CreateMessage($input: UserData) {
      createUser(input: $input) {
        name
        token
        id
      }
    }`;

    fetchGraphQL({
      query,
      variables: {
        input: {
          email,
          password,
          name
        }
      }
    }).then((res) => {
      console.log(res)
      console.log('createUser', res.data.createUser);
      sessionStorage.setItem('authToken', res.data.createUser.token);
      if(res.error) {
        this.setState({
          returnName: 'Error: could not signup'
        })
      } else {
        this.setState({
          returnName: res.data.createUser.name
        })
      }
    })
  }

  login() {
    const {email, password} = this.state
    const query = `mutation Login($input: UserData) {
      loginUser(input: $input) {
        name
        token
        id
      }
    }`;
    fetchGraphQL({
      query, 
      variables: {
        input: {
          email,
          password
        }
      }
    }).then((res) => {
      console.log(res)
      console.log('loginUser', res.data.loginUser)
      sessionStorage.setItem('authToken', res.data.loginUser.token);
      if(res.error) {
        this.setState({
          returnName: 'Incorrect Email or Password'
        })
      } else {
        this.setState({
          returnName: res.data.loginUser.name
        })
      }
    })
  }

  onClick() {
    if (this.state.authType === 'Signup') {
      this.signup()
    } else if (this.state.authType === 'Login') {
      this.login()
    } else {
      // error
      console.log('error: authType must be login or signup')
    }
  }

  toggleScreenType() {
    this.setState(prevState => ({
      authType: prevState.authType === 'Login' ? 'Signup' : 'Login'
    }))
  }

  renderLogin() {
    return (
      <form action="javascript:void(0)" className='auth-div'>
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
      </form>
    )
  }

  renderSignup() {
    return (
      <form action="javascript:void(0)" className='auth-div'>
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
        <button onClick={() => {this.onClick()}}>Submit</button>
      </form>
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
        <button 
          className='button' 
          onClick={() => {this.verifyUser()}} >
          testVerify
        </ button>
        {this.state.returnName}
      </div>
    )
  }
}

export default AuthenticationScreen