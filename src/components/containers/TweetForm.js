import React, { Component } from 'react';
import '../../css/TweetList.css';
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
        <div className='tweetBox'>
          <form onSubmit={this.handleSubmit}
              id="tweet_form"
              autoComplete='off'>
            
              <div className='tweetInput'>
                <input value={this.state.message} onChange={this.handleChange} onKeyPress={this.onKeyPress} placeholder="What's happening?"/>
              </div>
            
            <br />
            <input className='tweetButton' type='submit' value="TWEET" />
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

