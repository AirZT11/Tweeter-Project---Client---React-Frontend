import React, { Component } from 'react';
import AllUsers from './containers/AllUsersContainer';
import { connect } from 'react-redux';
import { useEffect } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    // finds users based on search input
    let users = this.props.users.filter(user => 
      user.username.includes(this.state.input)
    )

    return (
      <div>
        <h1>Search Users</h1>
        <form>
          <label htmlFor='search'>Search</label><br />
          <input type='text' value={this.state.input} onChange={this.handleChange} />
          < AllUsers users={users} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.userData.users
})

export default connect(mapStateToProps)(Search)