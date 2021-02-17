import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom'

const LOGIN_API_URL = 'http://localhost:3001/api/v1/login'

class Login extends Component {
  state = {
    username: '',
    password: ''
  } 

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  initialState = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(LOGIN_API_URL, {
      method: "POST",
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.props.handleLogin(data.user)
    })

  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username</label><br />
          <input id='username' name='username' type='text' onChange={this.handleUsernameChange}/>
          <br /><br />
          <label htmlFor='password'>Password</label><br />
          <input id='password' name='password' type='password' onChange={this.handlePasswordChange}/>
          <br /><br />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Login