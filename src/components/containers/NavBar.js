import React from 'react';
import '../../css/NavBar.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../css/Popup.css';

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userInitialize } from '../../actions/userActions';
import { tweetInitialize } from '../../actions/tweetActions';
import { followInitialize } from '../../actions/followActions';
import TweetForm from '../containers/TweetForm';

const NavBar = ({ logged_in, currentUser, userInitialize, tweetInitialize, followInitialize}) => {
  let logout = () => {
    userInitialize();
    tweetInitialize();
    followInitialize();
    localStorage.clear();
  }

  if (logged_in) {
    return (
      <div className='nav-bar'>
        <ul>
          <li>
            <NavLink
            to='/'
            exact
            className='nav-link'
            >{<HomeIcon />}Home</NavLink>
          </li>
        
          <li>
            <NavLink
              to='/profile'
              exact
              className='nav-link'
            >{<PersonIcon />}Profile</NavLink>
          </li>

          <li>
            <NavLink
              to='/Search'
              exact
              className='nav-link'
            >{<SearchIcon />}Search</NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings" 
              className='nav-link' 
            >{<SettingsIcon />}Settings</NavLink>
          </li>

          <li>
            <NavLink 
              to="/login" 
              className='nav-link' 
              onClick={logout}
            >{<ExitToAppIcon />}Logout</NavLink>
          </li>

          <li className='last-child'>
            <Popup trigger={<div className='nav-link'>{<TwitterIcon />}Tweet</div>} modal nested>
              {close => (
              <div className="modal">
                <button className="close" onClick={close}>&times;</button>
                <div className="header"> Tweet </div>
                <TweetForm />
                <button className="button" onClick={() => { close(); }} >close</button>
              </div>
              )}
            </Popup>
          </li>
        </ul>
      </div>
    ) 
  } 
  else {
    return(
      <div className='nav-bar'>
        <ul>
          <li>
            <NavLink
              to='/SignUp'
              exact
              className='nav-link'
            >Sign Up</NavLink>
          </li>

          <li>
            <NavLink
              to='/Login'
              exact
              className='nav-link'
              >Login</NavLink>    
          </li>
        </ul>
      </div>
    )
  } 
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default connect(mapStateToProps, { userInitialize, tweetInitialize, followInitialize })(NavBar);