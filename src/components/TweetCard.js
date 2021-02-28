import React, {Component} from 'react';
import EditForm from './EditForm'
import { Link } from 'react-router-dom'

class TweetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: this.props.tweet.message,
      editing: false
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
    let dateCreated = this.props.tweet.created_at.slice(0,10);
    let m = new Date(dateCreated);
    let dateString = (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + "/" + m.getUTCFullYear();

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

    let numOfLikes = () => {
      let likesArr = this.props.tweet.likes
      let likesLastChild = likesArr.slice(-1)[0]
      if (likesArr !== [] && likesLastChild !== undefined) {
        return likesLastChild.likes_per_tweet
      }
    }

    return (
      <div className='tweet-card'>
        <div className='tweet-container'>
          
          {/* Link needs to go to specific tweeter accounts, not just alreday lgged in account */}
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

          <button onClick={() => this.props.postLike(this.props.tweet)} style={{float: 'right'}}>Like {numOfLikes()}</button>
          <p>{dateString}</p>
        </div>
        
  
      </div>
    )
  }
  
} 

export default TweetCard;