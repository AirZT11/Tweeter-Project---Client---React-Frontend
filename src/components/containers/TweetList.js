import React from 'react';
import TweetCard from '../TweetCard'

const TweetList = (props) => {

  return (
    <div>
      <h3>Your Submitted Tweets!</h3>
      <hr></hr>
      <hr></hr>
      { props.tweets.map((tweet) => (
          <div key={tweet.id}>
            <TweetCard 
              tweet={tweet} 
              handleDelete={props.handleDelete}
              tweetsApiURL={props.tweetsApiURL} 
              // handleSubmitEdit={props.handleSubmitEdit}
              // handleEditChange={props.handleEditChange}
            />
          </div>
      ))}
    </div>
  )
} 

export default TweetList;