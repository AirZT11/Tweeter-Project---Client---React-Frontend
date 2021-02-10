import React, { Component } from 'react';

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

    const editURL = this.props.tweetsApiURL + `/${this.props.tweet.id}`;
    // fetch method PATCH to rails API and render udpated tweets
    fetch(editURL, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        message: this.state.tweetValue,
        //placeholder user_id
        user_id: 1
      })
    })
      .then(() => this.props.handleEditClick())
      //.then(() => this.props.renderTweetEdit())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitEdit}
          id="tweet_form"
          autoComplete='off'>
          <input type='text' value={this.state.tweetValue} onChange={this.handleEditChange} />
          <input type='submit' />
          
        </form>
        <button onClick={this.props.handleEditClick}>Cancel</button>
      </div>
    )
  }
  
} 

export default EditForm;