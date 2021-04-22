import React from 'react';
import '../../css/Widgets.css';
import '../../css/TweetList.css';
import Search from '../Search';

const WidgetsContainer = ({currentUser}) => {
if (currentUser !== null) 
  return (
    <div className='widgets-container'>
      {/* <div className='feedHeader'>
        <h2>Suggested Users</h2>
      </div> */}
      < Search />
    </div>
  )
else 
    return (
      <div>

      </div>
    )
}

export default WidgetsContainer;