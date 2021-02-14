import React, {Component} from 'react';
import EditForm from './EditForm'

class TweetCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      message: this.props.tweet.message
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

  // renderTweetEdit = () => {
  //   this.setState({
  //     message: this.props.tweet.message
  //   })
  // }

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

    return (
      <div className='card'>
        <div className='container'>
          <h5>{this.state.message}</h5>
          
          <button onClick={this.handleEditClick}>edit</button>
    
          <div style={editViewStyle}>
            < EditForm 
                tweetValue={this.props.tweet.message} 
                tweetsApiURL={this.props.tweetsApiURL}
                tweet={this.props.tweet}
                handleEditClick={this.handleEditClick}
                renderTweetEdit={this.renderTweetEdit} />
          </div>
    
          <button onClick={() => this.props.handleDelete(this.props.tweet)}>Delete</button>
    
          <p>{dateString}</p>
        </div>
        
  
      </div>
    )
  }
  
} 

export default TweetCard;