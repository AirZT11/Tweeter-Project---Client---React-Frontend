// currently not adding a password confirmation till the concept of authorizing users and logging in is understood

import React, {Component} from 'react';
import SignUpForm from '../SignUpForm';
import { connect } from 'react-redux';
import { createUser } from '../../actions/userActions';
import '../../css/SignIn.css'
import '../../css/TweetList.css'
import ErrorCard from '../ErrorCard';
import { clearErrors } from '../../actions/errorActions';

class SignUpContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    this.setState({
      image: event.target.files[0]
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    if (this.state.image !== null) formData.append('image', this.state.image);
    this.props.createUser(formData, this.props.history);
    if(this.props.errors === null) this.props.clearErrors();
    
  }

  render() {
    
    return (
      <div className='tweet-container'>
        <div className='signin-container'>
          < SignUpForm 
              handleChange={this.handleChange}
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
              state={this.state}
          />
          <div>< ErrorCard /></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errorData.errors
})

export default connect(mapStateToProps, { createUser, clearErrors })(SignUpContainer)
