import React, {Component} from 'react';
import '../css/TweetList.css'
import { Avatar } from '@material-ui/core';
import EditForm from './EditForm'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteTweet } from '../actions/tweetActions'
import { handleLike } from '../actions/likeActions';
import { withRouter } from 'react-router'

class TweetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      //likes: this.props.tweet.likes.length
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

  render() {
    const currentUserAndTweet = {
      currentUser: this.props.currentUser,
      tweet: this.props.tweet
    }
    // shows the date of tweet post
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
    if (this.props.currentUser.user.id !== this.props.tweet.user.id) {
      deleteEditViewStyle.display= 'none'
    }

    // conditional function to check if user has profile pic
    let profilePic = '';
    if (this.props.tweet.user.image) {
      profilePic = this.props.tweet.user.image.url;
    } else {
      profilePic = null;
    }

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

          <button onClick={() => this.props.handleLike(currentUserAndTweet)} style={{float: 'right'}}>
            {/* Like {this.props.tweet.likes.length} */}
            {/* Like {console.log(this.props.likes)} */}
          </button>
          
          <p>{dateString}</p>
          </div>
        </div>  
      
    )
  }
  
} 

const mapStateToProps = (state, ownProps) => {
  // const likedTweet = state.tweetsData.tweets.find(t => {
  //   return t.id === ownProps.tweet.id
  // })
  return {
    // likes: likedTweet.likes.length
    likes: state.tweetsData.tweets
  }
}

export default withRouter(connect(mapStateToProps, { deleteTweet, handleLike })(TweetCard));