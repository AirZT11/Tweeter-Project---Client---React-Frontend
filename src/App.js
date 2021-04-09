import React, {Component} from 'react';
import './css/App.css';
import Home from './components/containers/Home';
import Login from './components/Login';
import SignUp from './components/containers/SignUpContainer';
import Settings from './components/Settings';
import Search from './components/Search';
import Profile from './components/containers/Profile';
import User from './components/User';
import NavBar from './components/containers/NavBar';
import AllUsers from './components/AllUsers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser, fetchUsers } from './actions/userActions';

class App extends Component {

  componentDidMount() {
      this.props.fetchCurrentUser()
      this.props.fetchUsers()
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar logged_in={this.props.currentUser} />

          <Switch>
            <Route exact path='/' render={() => this.props.loading ? 
              null : (this.props.currentUser ?
                < Home currentUser={this.props.currentUser} /> 
                :
                < Login /> )}>
                  
            </Route>

            <Route exact path='/profile' render={() => this.props.loading ? 
              null : (this.props.currentUser ?
              < Profile currentUser={this.props.currentUser} /> 
              :
              < Login /> )}>
            </Route>

            <Route exact path='/settings' render={() => this.props.loading ? 
              null : (this.props.currentUser ? < Settings />
              :
              < Login /> )}>

            </Route>

            <Route exact path='/user/:id' render={(props) => {
              if (this.props.users !== []) {
                const userId = props.match.params.id
                return < User user={this.props.users.find(u => u.id == userId)} />
              }
            }} />

            <Route exact path='/login' render={() => this.props.currentUser ? 
                < Redirect to="/" /> : < Login /> }>
            </Route>

            <Route exact path='/search' component={Search}></Route>

            <Route exact path='/signUp' component={SignUp}></Route>

            <Route exact path='/allUsers' component={AllUsers} />

          </Switch>
        </Router>

      </div>
    );
  }
    
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser,
  users: state.userData.users,
  loading: state.userData.loading
})

export default connect(mapStateToProps, { fetchCurrentUser, fetchUsers })(App);
