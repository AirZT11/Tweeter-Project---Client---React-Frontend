import React, { Component } from 'react';
// import Form from '../Form';

class TweetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: this.props.tweetsApiURL,
      message: ''
    }
  }
  
  getInitialState = () => ({
    message: ''
  })

  handleSubmit = event => {
    event.preventDefault();

    fetch(this.state.api_url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        message: this.state.message,
        user_id: this.props.currentUser.id
      })
    })
    .then(response => response.json())
    .then(data => this.props.updateTweetList(data))
    this.setState(this.getInitialState())
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  onKeyPress = (e) => {
    if(e.which === 13) {
      this.handleSubmit(e);
    }
  }

// planning on refactoring presentational code into Form component
  render () {
    return (
      <div>
        <h4>Submit a Tweet</h4>
        <form onSubmit={this.handleSubmit}
            id="tweet_form"
            autoComplete='off'>
          <span>
            <textarea className='tweetInput' value={this.state.message} onChange={this.handleChange} onKeyPress={this.onKeyPress} placeholder='enter new tweet...'/>
          </span>
          <br />
          <input type='submit' />
          <br /><br />
        </form>
        
      </div>
    )
  }
}
  

export default TweetForm;

