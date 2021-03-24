import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTweet } from '../../actions/tweetActions';

class TweetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  
  getInitialState = () => this.setState({
    message: ''
  })

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = {
      message: this.state.message,
      user_id: this.props.currentUser.id
    }
    console.log(formData)
    this.props.createTweet(formData)
    this.getInitialState()
  }

  onKeyPress = (e) => {
    if(e.which === 13) {
      this.handleSubmit(e);
    }
  }

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

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser.user
})

export default connect(mapStateToProps, { createTweet })(TweetForm);

