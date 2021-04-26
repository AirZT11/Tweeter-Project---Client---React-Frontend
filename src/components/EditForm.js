import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTweet } from '../actions/tweetActions'

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetValue: this.props.tweetValue
    }
  }
  handleEditChange = (event) => {
    this.setState({
      tweetValue: event.target.value
    })
  }

  handleSubmitEdit = (e) => {
    // e.preventDefault();
    const formData = {
      message: this.state.tweetValue,
      user_id: this.props.currentUser.id,
      id: this.props.tweet.id
    }
    this.props.editTweet(formData)
    this.props.handleEditClick()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitEdit}
          id="tweet_form"
          autoComplete='off'>
          <textarea className='tweetInput' value={this.state.tweetValue} onChange={this.handleEditChange} /><br />
          <input type='submit' />
          
        </form>
        <button onClick={this.props.handleEditClick}>Cancel</button>
      </div>
    )
  }
  
} 

export default connect(null, { editTweet })(EditForm);
