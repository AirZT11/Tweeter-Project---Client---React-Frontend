import React, {Component} from 'react';

class Profile extends Component {

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h3>{this.props.currentUser.user.name}</h3>
        <h3>@{this.props.currentUser.user.username}</h3>
        <h5>Followers</h5>
        <h5>Following</h5>
        
      </div>
    )
  }
}

export default Profile