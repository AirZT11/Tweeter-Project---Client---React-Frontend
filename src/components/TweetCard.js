import React, {Component} from 'react';
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
      likes: this.props.tweet.likes.length
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

    return (
      <div className='tweet-card'>
        <div className='tweet-container'>
          
              <Link to={`/user/${this.props.tweet.user.id}`} style={{ textDecoration: 'none' }}>
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
          
          </div>  

          <br />

          <button onClick={() => this.props.handleLike(currentUserAndTweet)} style={{float: 'right'}}>
            Like {this.state.likes}
          </button>
          
          <p>{dateString}</p>
        </div>  
      </div>
    )
  }
  
} 

const mapStateToProps = (state, ownProps) => {
  const likedTweet = state.tweetsData.tweets.find(t => {
    return t.id === ownProps.tweet.id
  })
  return {
    likes: likedTweet.likes.length
  }
}

export default withRouter(connect(mapStateToProps, { deleteTweet, handleLike })(TweetCard));