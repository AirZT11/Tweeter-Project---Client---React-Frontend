import React, {Component} from 'react';
import EditForm from './EditForm'
import { Link } from 'react-router-dom'

class TweetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: this.props.tweet.message,
      editing: false,
      tweet_id: this.props.tweet.id,
      likes: this.props.tweet.likes.length
    }
  }

  // POST like fetch function
  handleLike = (tweet) => {
    // let lastLikeObj = tweet.likes
    let userLikedTweet = tweet.likes.find(like => like.user_id === this.props.currentUser.id) 
    console.log(`currentUser: ${this.props.currentUser.id}`)
    console.log(userLikedTweet)

    if (userLikedTweet) {
      console.log('deleting like')
      fetch(`http://localhost:3001/api/v1/likes/${userLikedTweet.id}`, {
        method: 'DELETE'
      })
      .then(this.setState({
        likes: this.state.likes - 1
      }))
      
    } else {
      console.log("adding like")
      fetch('http://localhost:3001/api/v1/likes', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          user_id: this.props.currentUser.id,
          tweet_id: tweet.id,
          likes_per_tweet: tweet.likes.length + 1
        })
      })
      .then(response => response.json())
      .then(data => 
        this.setState({
        likes: data.like.likes_per_tweet
        })
      )
    }
  }

  handleEditClick = () => {
    if (this.state.editing === false ) {
      this.setState({
        editing: true
      })
    } else {
      this.setState({
        editing: false
      })
    } 
  }
  
  // current solution to finding num of likes seems hacky. 
  // POSSIBLY NEEDS REFACTORING!!
  numOfLikes = () => {
    let likesArr = this.props.tweet.likes
    let likesLastChild = likesArr.slice(-1)[0]
    if (likesArr !== [] && likesLastChild !== undefined) {
      return likesLastChild.likes_per_tweet
    } else {
      return null
    }
  }

  render() {
    let dateCreated = this.props.tweet.created_at.slice(0,10);
    let m = new Date(dateCreated);
    let dateString = (m.getUTCMonth()+1) +"/"+ (m.getUTCDate()) + "/" + m.getUTCFullYear();

    let editViewStyle = {};

    if (this.state.editing) {
      editViewStyle.display = 'block'
    } else {
      editViewStyle.display = 'none'
    } 

    let deleteEditViewStyle = {};

    if (this.props.currentUser.id !== this.props.tweet.user.id) {
      deleteEditViewStyle.display= 'none'
    }

    return (
      <div className='tweet-card'>
        <div className='tweet-container'>
          
          {/* Link needs to go to specific tweeter accounts, not just currently logged in account */}
          <Link to="/profile" style={{ textDecoration: 'none' }}>
          <span className='main-username'>{this.props.tweet.user.username} </span>
          <span className='sub-username'>@{this.props.tweet.user.username}</span>
          </Link>
          <p>{this.state.message}</p>

          <div style={deleteEditViewStyle}>
            <button onClick={this.handleEditClick}>edit</button>
      
            <div style={editViewStyle}>
              < EditForm 
                  currentUser={this.props.currentUser}
                  tweetValue={this.props.tweet.message} 
                  tweetsApiURL={this.props.tweetsApiURL}
                  tweet={this.props.tweet}
                  handleEditClick={this.handleEditClick}
                  renderTweetEdit={this.renderTweetEdit} />
            </div>
          
            <button onClick={() => this.props.handleDeleteTweet(this.props.tweet)}>Delete</button>
          
          </div>  

          <br />

          <button onClick={() => this.handleLike(this.props.tweet)} style={{float: 'right'}}>
            Like {this.state.likes}
          </button>
          
          <p>{dateString}</p>
        </div>  
      </div>
    )
  }
  
} 

export default TweetCard;