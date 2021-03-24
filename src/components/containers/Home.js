import React, {Component} from 'react';
import TweetList from './TweetList'
import TweetForm from './TweetForm'
import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweetActions';
// import { render } from '@testing-library/react';
import { withRouter } from 'react-router'

class Home extends Component {
  componentDidMount() {
    this.props.fetchTweets();
  }

  render() {
    return (
        <div className="App">
          
          < TweetForm 
              updateTweetList={this.props.updateTweetList} 
          />

          < TweetList 
              tweets={this.props.tweets}
          />  
        </div>
    )
  }
}
  

const mapStateToProps = state => ({
  tweets: state.tweetsData.tweets,
  newTweet: state.tweetsData.tweet,
})

export default withRouter(connect(mapStateToProps, { fetchTweets })(Home));