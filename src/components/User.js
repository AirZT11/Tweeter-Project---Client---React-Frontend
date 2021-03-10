// import React, {Component} from 'react';
import TweetList from './containers/TweetList'
// import TweetForm from './containers/TweetForm'

const User = props => {

    return (
      <div>
        {/* {console.log(props.currentUser)} */}
        <div className='profile-card'>
          <span className='main-username'>{props.currentUser.name}</span> <br />
          <span className='sub-username'>@{props.currentUser.username}</span><br />
          <span>Followers </span><br />
          <span>Following</span>
        </div>

        <h3>Your Submitted Tweets!</h3>
          < TweetList 
              tweetsApiURL={props.TWEETS_API_URL} 
              currentUser={props.currentUser}
              tweets={props.userTweets} 
              handleDeleteTweet={props.handleDeleteTweet} 
          />  
      </div>
    )
}

export default User