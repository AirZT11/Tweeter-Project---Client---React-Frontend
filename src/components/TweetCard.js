import React, {Component} from 'react';
import '../css/TweetList.css'
import '../css/Images.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Avatar } from '@material-ui/core';
import EditForm from './EditForm'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteTweet } from '../actions/tweetActions'
import { withRouter } from 'react-router'
import { API_URL } from '../actions/types';

class TweetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      likes: this.props.tweet.likes,
      likesLength: this.props.tweet.likes.length
    }
  }

  handleLike = (userAndTweet) => {
    const userLikedTweet = this.state.likes.find(like => 
      like.user_id === userAndTweet.currentUser.user.id) 
    
    const filteredLikes = this.state.likes.filter(like =>
      like.user_id !== userAndTweet.currentUser.user.id)

    if (userLikedTweet) {
      console.log('deleting like')
      fetch(`${API_URL}/likes/${userLikedTweet.id}`, {
        method: 'DELETE'
      })
      .then(this.setState({
        likesLength: this.state.likesLength - 1,
        likes: filteredLikes
      }))
    } else {
      console.log("adding like")
      fetch(API_URL + '/likes', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          user_id: userAndTweet.currentUser.user.id,
          tweet_id: userAndTweet.tweet.id,
          likes_per_tweet: userAndTweet.tweet.likes.length + 1
        })
      })
      .then(response => response.json())
      .then(data => 
        this.setState({
          likesLength: this.state.likesLength + 1,
          likes: [...this.state.likes, data.like]
        })
      )
    }
  }

  handleEditClick = () => {
    if (this.state.editing === false ) {
      this.setState({ editing: true })
    } else {
      this.setState({ editing: false })
    } 
  }

  // conditional function to check if tweet image exists
  imageExists = () => {
    let tweetPic = '';
    if (this.props.tweet.image) {
      tweetPic = this.props.tweet.image.url;
    } else {
      tweetPic = null;
    }
    return tweetPic
  }

  render() {
    const currentUserAndTweet = {
      currentUser: this.props.currentUser,
      tweet: this.props.tweet
    }

    // shows the date of tweet post
    // should move to the backend
    let dateCreated = this.props.tweet.created_at.slice(0,10);
    let m = new Date(dateCreated);
    let dateString = (m.getUTCMonth()+1) +"/"+ (m.getUTCDate()) + "/" + m.getUTCFullYear();

    // edit and delete view style based on currentUser
    let editViewStyle = {};
    if (this.state.editing) { editViewStyle.display = 'block' } 
    else { editViewStyle.display = 'none' } 

    let deleteEditViewStyle = {};
    if (this.props.currentUser.user.id !== this.props.tweet.user.id) {
      deleteEditViewStyle.display= 'none'
    }

    // conditional to check if user has profile pic
    let profilePic = '';
    if (this.props.tweet.user.image) { profilePic = this.props.tweet.user.image.url; } 
    else { profilePic = null; }

    return (
      <div className='tweet-card'>
        <span className='tweet_avatar'>
          <Link to={`/user/${this.props.tweet.user.id}`} style={{ textDecoration: 'none' }}>
            <Avatar src={profilePic} />
          </Link>
        </span>

        <div className='tweet-body'>
          <Link to={`/user/${this.props.tweet.user.id}`} style={{ textDecoration: 'none' }}>
            <span className='main-username'>{this.props.tweet.user.username}</span>
            <span className='sub-username'> @{this.props.tweet.user.username}</span>
          </Link>
          
          <div className='tweet__message'>
            <p>{this.props.tweet.message}</p>
            <img className="tweet-img" src={this.imageExists()}></img>
            <div style={deleteEditViewStyle}>
              <button onClick={this.handleEditClick}>edit</button>
        
              <div style={editViewStyle}>
                < EditForm 
                    currentUser={this.props.currentUser}
                    tweetValue={this.props.tweet.message} 
                    tweet={this.props.tweet}
                    handleEditClick={this.handleEditClick} />
              </div>
            
              <button onClick={() => this.props.deleteTweet(this.props.tweet)}>Delete</button>
            
            </div>

            <div style={{float: 'right'}}>
            <FavoriteBorderIcon onClick={() => this.handleLike(currentUserAndTweet)}  />
            {this.state.likesLength}
            </div>
            
            <p>{dateString}</p> 
          </div>
        </div>
      </div>  
    )
  } 
} 

export default withRouter(connect(null, { deleteTweet })(TweetCard));