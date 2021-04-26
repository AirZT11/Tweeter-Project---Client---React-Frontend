import React, { Component } from 'react';
import AllUsers from './containers/AllUsersContainer';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userActions';
import '../css/TweetList.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  componentDidMount() {
    fetchUsers();
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  // finds users based on search input
  users = () => {
    if (this.props.users) {
    return this.props.users.filter(user => 
      user.username.includes(this.state.input)
    )
  }}

  render() {
    

    return (
      <div className='tweet-container'>
        <div className='feedHeader'>
          <h2>Search Users</h2>
          <form className='tweetInput'>
            <label htmlFor='search'></label><br />
            <input type='text' value={this.state.input}  placeholder='search users...' onChange={this.handleChange} />  
          </form>
        </div>
        < AllUsers users={this.users()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.userData.users
})

export default connect(mapStateToProps, { fetchUsers })(Search)
