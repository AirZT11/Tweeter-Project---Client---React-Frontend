import React, {Component} from 'react';
import './App.css';
import Home from './components/containers/Home';
import Login from './components/Login';
import SignUp from './components/containers/SignUpContainer';
import Search from './components/Search';
import Profile from './components/Profile';
import User from './components/User';
import NavBar from './components/containers/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser, fetchUsers } from './actions/userActions';

class App extends Component {

  componentDidMount() {
      this.props.fetchCurrentUser()
      this.props.fetchUsers()
  }

  // handleLogin = (user) => {
  //   this.setState({
  //     currentUser: user
  //   })
  // }
  
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar logged_in={this.props.currentUser} />

          <h1>Tweeter</h1>
          {/* <h2>{this.props.currentUser ? `Welcome back ${this.props.currentUser.user.name}!` : null}</h2> */}

          <Switch>
            <Route exact path='/' render={() => this.props.currentUser ?
                < Home currentUser={this.props.currentUser} /> 
                :
                < Login /> }>
                  
            </Route>

            <Route exact path='/profile' render={() => this.props.currentUser ?
                < Profile currentUser={this.props.currentUser} /> 
                :
                < Login /> }>
            </Route>

            <Route exact path='/user/:id' render={(props) => {
              
              if (this.props.users !== []) {
                const userId = props.match.params.id
                return < User 
                user={this.props.users.find(u => u.id == userId)} 
                />
              }
            }} />

            <Route exact path='/login' render={() => this.props.currentUser ? 
                < Redirect to="/" /> : < Login /> }>
            </Route>

            <Route exact path='/search' component={Search}></Route>

            <Route exact path='/signUp' component={SignUp}></Route>
          </Switch>
        </Router>

      </div>
    );
  }
    
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser,
  users: state.userData.users,
})

export default connect(mapStateToProps, { fetchCurrentUser, fetchUsers })(App);
