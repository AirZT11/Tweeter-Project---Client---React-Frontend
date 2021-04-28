import React from 'react';
import '../css/InstructionsPage.css'

const InstructionsPage = props => {

  return (
    <div className='page-container'>
      <h1>Welcome To Tweeter!</h1>
      <h2>Please sign up or login with a created user</h2>
      <p>You are welcome to use the user accounts listed below</p>
      <table>
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
      </table>
    </div>
  )
}

export default InstructionsPage;