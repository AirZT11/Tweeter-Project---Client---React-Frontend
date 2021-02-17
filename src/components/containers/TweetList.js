import React from 'react';
import TweetCard from '../TweetCard'

const TweetList = (props) => {

  return (
    <div>
      <h3>Your Submitted Tweets!</h3>

      { props.tweets.map((tweet) => (
          <div key={tweet.id}>
            <TweetCard 
              tweet={tweet} 
              currentUser={props.currentUser}
              handleDeleteTweet={props.handleDeleteTweet}
              tweetsApiURL={props.tweetsApiURL} 
            />
          </div>
      ))}
    </div>
  )
} 

export default TweetList;