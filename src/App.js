import React, {Component} from 'react';
import './App.css';
import Home from './components/containers/Home';
import Login from './components/Login'
import SignUp from './components/containers/SignUpContainer'
import Search from './components/Search'
import Profile from './components/Profile'
import NavBar from './components/containers/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

const TWEETS_API_URL = 'http://localhost:3001/api/v1/tweets'

class App extends Component {
  state = {
    currentUser: null,
    allTweets: [],
    userTweets: []
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      this.handleUserFetch()
      this.fetchAllTweets()
      this.fetchUserTweets()
    }
  }

  handleUserFetch = () => {
    const token = localStorage.getItem("token")
    if(token){
      console.log('attempting to log user in')
      //GET fetch
      fetch(`http://localhost:3001/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          currentUser: data
        })
        console.log(data)
      })
    } else {
      console.log('no token available. manually login')
      // go to sign up page or
      // go to login page and make user sign in

    }
  }

  handleLogin = (user) => {
    this.setState({
      currentUser: user
    })
  }

  fetchAllTweets = () => {
    fetch(TWEETS_API_URL)
    .then(response => response.json())
    .then(data => this.setState({
      allTweets: data.sort(this.custom_sort)
    }))
  }

  fetchUserTweets = () => {
    //const token = localStorage.getItem("token")
    fetch(TWEETS_API_URL)
    .then(response => response.json())
    .then(data => 
      data.filter(tweet => {
        return tweet.user.id === this.state.currentUser.user.id
      }))
    .then(data => this.setState({
      userTweets: data.sort(this.custom_sort)
    }))
  }

  updateTweetList = (tweetData) => {
    this.setState({
      allTweets: [tweetData, ...this.state.allTweets]
    })
  }

  handleDeleteTweet = tweet => {
    const deleteURL = TWEETS_API_URL + `/${tweet.id}`;
    fetch(deleteURL, {
      method: 'DELETE'
    })
      .then(() => {
        const tweetDeletedFromList = this.state.allTweets.filter(t => t !== tweet)
          this.setState({
            allTweets: tweetDeletedFromList
          })
      })
  }

  custom_sort = (a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }
  
  render() {
    return (
      <div className="App">
          
        <Router>
          <NavBar 
            logged_in={this.state.currentUser} 
            setCurrentUser={this.handleLogin}
           />

          <h1>Tweeter</h1>
          {/* <h2>{`Welcome back ${this.currentUser ? this.state.currentUser.user.name : null}!`}</h2> */}

          <Route exact path='/' render={() => this.state.currentUser ?
              < Home 
                currentUser={this.state.currentUser} 
                TWEETS_API_URL={TWEETS_API_URL}
                allTweets={this.state.allTweets} 
                updateTweetList={this.updateTweetList}
                handleDeleteTweet={this.handleDeleteTweet} /> :
              < Login handleLogin={this.handleLogin} /> }>
          </Route>

          <Route exact path='/profile' render={() => this.state.currentUser ?
              < Profile 
                currentUser={this.state.currentUser} 
                TWEETS_API_URL={TWEETS_API_URL}
                userTweets={this.state.userTweets} 
                updateTweetList={this.updateTweetList}
                handleDeleteTweet={this.handleDeleteTweet}/> :
              < Login handleLogin={this.handleLogin} /> }>
          </Route>

          <Route 
            exact path='/login' 
            render={() => this.state.currentUser ? 
              < Redirect to="/" /> :
              < Login handleLogin={this.handleLogin} /> }>
          </Route>

          <Route exact path='/search' component={Search}></Route>

          <Route exact path='/signUp' component={SignUp}></Route>

        </Router>

      </div>
    );
  }
    
}

export default App;
