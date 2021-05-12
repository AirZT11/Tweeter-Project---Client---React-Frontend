import React from 'react';
import '../css/WelcomePage.css';
import '../css/TweetList.css';

const WelcomePage = props => {

  return (
    <div className='tweet-container'>
      <div className='page-container'>
        <h1>Welcome To Tweeter!</h1>
        <h2>Please sign up or login with a created user</h2>
        <p>You are welcome to use the user accounts listed below</p>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
            <tr>
              <td>1.</td>
              <td>user</td>
              <td>password</td>
            </tr>
          </tbody> 
        </table>
      </div>
    </div>
  )
}

export default WelcomePage;