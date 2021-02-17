import React, {Component} from 'react';
import TweetList from './TweetList'
import TweetForm from './TweetForm'
// import {Redirect} from 'react-router-dom'


class Home extends Component {

  render() {
      return (
        <div className="App">
          
          < TweetForm 
              tweetsApiURL={this.props.TWEETS_API_URL} 
              updateTweetList={this.props.updateTweetList} 
              currentUser={this.props.currentUser}
          />

          < TweetList 
              currentUser={this.props.currentUser}
              tweets={this.props.userTweets} 
              handleDeleteTweet={this.props.handleDeleteTweet} 
              tweetsApiURL={this.props.TWEETS_API_URL} 
          />  
        </div>
      )   
  }
}

export default Home;