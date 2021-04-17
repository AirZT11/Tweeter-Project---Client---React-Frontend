import React, {Component} from 'react';
import '../css/TweetList.css'
import { Avatar } from '@material-ui/core';
import EditForm from './EditForm'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteTweet } from '../actions/tweetActions'
import { withRouter } from 'react-router'

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
      fetch(`http://localhost:3001/api/v1/likes/${userLikedTweet.id}`, {
        method: 'DELETE'
      })
      .then(this.setState({
        likesLength: this.state.likesLength - 1,
        likes: filteredLikes
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

    // conditional function to check if user has profile pic
    let profilePic = '';
    if (this.props.tweet.user.image) { profilePic = this.props.tweet.user.image.url; } 
    else { profilePic = null; }

    return (
      <div className='tweet-card'>
          {/* {console.log(this.props.tweet.user)} */}
          <div className='tweet-body'>
            <Link to={`/user/${this.props.tweet.user.id}`} style={{ textDecoration: 'none' }}>
              <span><Avatar src={profilePic} /></span>
              <span className='main-username'>{this.props.tweet.user.username}</span>
              <span className='sub-username'> @{this.props.tweet.user.username}</span>
            </Link>

          <p>{this.props.tweet.message}</p>

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
          
          </div><br />

          <button onClick={() => this.handleLike(currentUserAndTweet)} style={{float: 'right'}}>
            Like {this.state.likesLength}
            {/* Like {console.log(this.props.likes)} */}
          </button>
          
          <p>{dateString}</p>
        </div>
      </div>  
    )
  } 
} 

export default withRouter(connect(null, { deleteTweet })(TweetCard));