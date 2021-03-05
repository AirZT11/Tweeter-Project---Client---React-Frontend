import React, {Component} from 'react';
import TweetCard from '../TweetCard'

class TweetList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: 0
    }
  }
  // componentDidMount() {
  //   // this.fetchLikes()
  // }

  // fetchLikes = () => {
  //   fetch('http://localhost:3001/api/v1/likes')
  //   .then(response => response.json())
  //   .then(like => 
  //     console.log(like)

    //   this.setState({
    //   likes: like.likes_per_tweet
    // })
  //   )
  // }

  //need to figure out how to access key value of likes.likes_per_tweet
  postLike = (tweet) => {
    let lastTweet = tweet.likes.slice(-1)
    console.log(...lastTweet)
    // fetch('http://localhost:3001/api/v1/likes', {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": 'application/json',
    //     "Accept": 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user_id: this.props.currentUser.user.id,
    //     tweet_id: tweet.id,
    //     likes_per_tweet: tweet.likes + 1
    //   })
    // })
    // .then(response => response.json())
    // .then(like => console.log(like)

    //   this.setState({
    //   likes: like.likes_per_tweet
    // })
    // )
  }

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