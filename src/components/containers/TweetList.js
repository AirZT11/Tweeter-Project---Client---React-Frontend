import React, {Component} from 'react';
import TweetCard from '../TweetCard'

class TweetList extends Component {

  // postLike = (tweet) => {
  //   // let lastTweet = tweet.likes.slice(-1)
  //   console.log(tweet)
  //   console.log(tweet.likes.slice(-1))
  //   // console.log(lastTweet[0].likes_per_tweet)

  //   fetch('http://localhost:3001/api/v1/likes', {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": 'application/json',
  //       "Accept": 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user_id: this.props.currentUser.id,
  //       tweet_id: tweet.id,
  //       likes_per_tweet: tweet.likes === [] ? 1 : tweet.likes.slice(-1)[0].likes_per_tweet + 1
  //     })
  //   })

  //   .then(response => response.json())
  //   .then(data => 
  //     this.setState({
  //     likes: data.like.likes_per_tweet
  //   })
  //   )
  // }

  render() {
    return (
      <div>

        { this.props.tweets.map((tweet) => (
            <div key={tweet.id}>
              <TweetCard 
                tweet={tweet} 
                currentUser={this.props.currentUser}
                handleDeleteTweet={this.props.handleDeleteTweet}
                tweetsApiURL={this.props.tweetsApiURL} 
                postLike={this.postLike}
              />
            </div>
        ))}
      </div>
    )
  }
  
} 

export default TweetList;