import React, {Component} from 'react';
import { loginUser } from '../actions/userActions';
import { connect } from 'react-redux';
import '../css/SignIn.css'

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
    const userInputData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(userInputData)
  }

  render() {
    return (
      <div className='signin-container'>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label htmlFor='username'>Username</label><br />
          <input id='username' name='username' type='text' placeholder='username' onChange={this.handleUsernameChange}/>
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

export default connect(null, { loginUser })(Login)
