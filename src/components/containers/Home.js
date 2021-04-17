import React, {Component} from 'react';
import '../../css/TweetList.css';
import TweetList from './TweetList'
import TweetForm from './TweetForm'
import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweetActions';
import { withRouter } from 'react-router'

class Home extends Component {
  componentDidMount() {
    this.props.fetchTweets(this.props.currentUser);
  }

  render() {
    return (
        <div className='tweet-container'>
          <div className='feedHeader'>
            <h2>Home</h2>
          </div>
          < TweetForm />
          < TweetList tweets={this.props.tweets} />
        </div>
    )
  }
}
  

const mapStateToProps = state => ({
  tweets: state.tweetsData.userAndFollowedTweets,
  currentUser: state.userData.currentUser,
})

export default withRouter(connect(mapStateToProps, { fetchTweets })(Home));