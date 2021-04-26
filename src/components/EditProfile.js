import React, { Component } from 'react';
import '../css/TweetList.css';
import { editUser } from '../actions/userActions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.currentUser.user.id,
      image: this.props.currentUser.user.image,
      name: this.props.currentUser.user.name,
      email: this.props.currentUser.user.email,
      username: this.props.currentUser.user.username,
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
    // event.preventDefault();
    console.log(this.state)
    this.props.editUser(this.state);
  }

  render() {
    return (
      <div className="tweet-container">
        <form onSubmit={this.handleSubmit}>
          
          <label htmlFor='name'>Name: </label><br />
          <input value={this.state.name} id='name' name='name' type='text' placeholder="name" onChange={this.handleChange} />
          <br /><br />
          <label htmlFor='email'>Email: </label><br />
          <input value={this.state.email} id='email' name='email' type='text' placeholder="email" onChange={this.handleChange} />
          <br /><br />
          <label htmlFor='username'>Username: </label><br />
          <input value={this.state.username} id='username' name='username' type='text' placeholder='username' onChange={this.handleChange}/>
          <br /><br />
          <label htmlFor='image'>Update Photo:</label><br />
          <input id='image' name='image' type='file' onChange={this.handleFileChange} />
          <input type='submit' /><br />
        </form>
      </div>
    )
  }   
}

export default withRouter(connect(null, { editUser })(EditProfile))