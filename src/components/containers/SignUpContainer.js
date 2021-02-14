// currently not adding a password confirmation till the concept of authorizing users and logging in is understood

import React, {Component} from 'react';
import SignUpForm from '../SignUpForm';

const USERS_API_URL = 'http://localhost:3001/api/v1/users'

class SignUpContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      name: '',
      email: '',
      username: '',
      password: '',
      // confirmation: ''
    }
  }

  // componentDidMount() {
  //   this.fetchUsers
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(event.target.value))
  }

  handleSubmit = event => {
    event.preventDefault();
    this.postUser();
  }

  postUser = () => {
    fetch(USERS_API_URL, {
      method: 'POST',
      mode: 'cors', // why do you use cors?
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          email: this.state.email,
          username: this.state.username,

          //obviously going to need some level of decrytion for passwords
          password: this.state.password, 
          // password_confirmation: this.state.confirmation
      }
      })
    }).then(response => response.json())
    .then(data => console.log(data))
  }

  render() {
    
    return (
      <div>
        < SignUpForm 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignUpContainer