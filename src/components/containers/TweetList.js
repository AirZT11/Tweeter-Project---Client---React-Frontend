import React, {Component} from 'react';
import TweetCard from '../TweetCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class TweetList extends Component {

  custom_sort = (a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }

  render() {
    if (this.props.tweets === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          { this.props.tweets.sort(this.custom_sort).map((tweet) => (
              <div key={tweet.id}>
                <TweetCard 
                  tweet={tweet} 
                  currentUser={this.props.currentUser}
                />
              </div>
          ))}
        </div>
      )
    }
  }
  
} 

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps)(TweetList));