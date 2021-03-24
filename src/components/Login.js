import React, {Component} from 'react';
import { loginUser } from '../actions/userActions';
import { connect } from 'react-redux';

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
    // call loginUser(userInputData) action
    this.props.loginUser(userInputData)
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

export default connect(null, { loginUser })(Login)