import React, {Component} from 'react';
import TweetList from './containers/TweetList'
import TweetForm from './containers/TweetForm'

class Profile extends Component {

  render() {
    return (
      <div>
        <div className='profile-card'>
          <span className='main-username'>{this.props.currentUser.user.name}</span> <br />
          <span className='sub-username'>@{this.props.currentUser.user.username}</span><br />
          <span>Followers </span><br />
          <span>Following</span>
        </div>
        
          {/* < TweetForm 
              tweetsApiURL={this.props.TWEETS_API_URL} 
              updateTweetList={this.props.updateTweetList} 
              currentUser={this.props.currentUser}
          /> */}
        <h3>Your Submitted Tweets!</h3>
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

export default Profile