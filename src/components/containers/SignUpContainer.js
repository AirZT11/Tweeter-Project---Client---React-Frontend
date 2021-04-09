// currently not adding a password confirmation till the concept of authorizing users and logging in is understood

import React, {Component} from 'react';
import SignUpForm from '../SignUpForm';
import { connect } from 'react-redux';
import { createUser } from '../../actions/userActions';

class SignUpContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // users: [],
      name: '',
      email: '',
      username: '',
      password: '',
      image: null
      // confirmation: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileChange = (event) => {
    // console.log(event.target.files[0])
    this.setState({
      image: event.target.files[0]
    })
  }


  handleSubmit = event => {
    event.preventDefault();
    this.props.createUser(this.state);
  }

  render() {
    
    return (
      <div>
        < SignUpForm 
            handleChange={this.handleChange}
            handleFileChange={this.handleFileChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
        />
      </div>
    )
  }
}

export default connect(null, { createUser })(SignUpContainer)