import React, {Component} from 'react';
import './App.css';
import TweetList from './components/containers/TweetList'
import TweetForm from './components/containers/TweetForm'

const TWEETS_API_URL = 'http://localhost:3001/api/v1/tweets'

class App extends Component {
  state = {
    tweets: []
  }

  componentDidMount() {
    fetch(TWEETS_API_URL)
    .then(response => response.json())
    .then(data => this.setState({
      tweets: data.sort(this.custom_sort)
    }))
  }

  custom_sort = (a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }

  updateTweetList = (tweetData) => {
    this.setState({
      tweets: [tweetData, ...this.state.tweets]
    })
  }

  handleDelete = tweet => {
    const deleteURL = TWEETS_API_URL + `/${tweet.id}`;
    fetch(deleteURL, {
      method: 'DELETE'
    })
      .then(() => {
        const tweetDeletedFromList = this.state.tweets.filter(t => t !== tweet)
          this.setState({
            tweets: tweetDeletedFromList
          })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Tweeter</h1>
        < TweetForm 
            tweetsApiURL={TWEETS_API_URL} 
            updateTweetList={this.updateTweetList} 
        />
        <hr></hr>
        <hr></hr>
        < TweetList 
            tweets={this.state.tweets} 
            handleDelete={this.handleDelete} 
            handleSubmitEdit={this.handleSubmitEdit}
            handleEditChange={this.handleEditChange}
            tweetsApiURL={TWEETS_API_URL} 
            // editState={this.state.editTweet}
        />
      </div>
    );
  }
    
}

export default App;
