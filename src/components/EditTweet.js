import React, {Component} from 'react';

class EditTweet extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     editValue: this.props.tweet.message
  //   }
  // }


  render() {
    return (
      <div>
        <form onSubmit={() => this.props.handleEdit(this.props.tweet)}>
          <input type='text' value={this.props.tweet.message} onChange={this.props.handleEditChange} />
          <input type='submit' value='Submit Edit' />
        </form>
      </div>
    )
  }
  
} 

export default EditTweet;