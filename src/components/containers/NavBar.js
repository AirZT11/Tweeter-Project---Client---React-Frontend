import React from 'react';
import '../../css/NavBar.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/userActions';

const NavBar = ({setCurrentUser, logged_in, currentUser}) => {
  let logout = () => {
    setCurrentUser(null)
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
            >Home</NavLink>
          </li>
        
          <li>
            <NavLink
              to='/profile'
              exact
              className='nav-link'
            >Profile</NavLink>
          </li>

          <li>
            <NavLink
              to='/Search'
              exact
              className='nav-link'
            >Search</NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings" 
              className='nav-link' 
            >Settings</NavLink>
          </li>

          <li>
            <NavLink 
              to="/login" 
              className='nav-link' 
              onClick={logout}
            >Logout</NavLink>
          </li>
        </ul>
      </div>
    ) 
  } 
  // TODO: set an AllUsers navlink when ADMIN is loggedin
  // else if (currentUser.user.id === 13 && logged_in){
  //   return(
  //   <div className='nav-bar'>
  //       <ul>
  //         <li>
  //           <NavLink
  //           to='/AllUsers'
  //           exact
  //           className='nav-link'
  //           >All Users</NavLink>
  //         </li>

  //         <li>
  //           <NavLink 
  //             to="/login" 
  //             className='nav-link' 
  //             onClick={logout}
  //           >Logout</NavLink>
  //         </li>
  //       </ul>
  //   </div>
  //   )
  // } 
  else {
    return(
      <div className='nav-bar'>
        <ul>
          <li>
            <NavLink
              to='/'
              exact
              className='nav-link'
            >Home</NavLink>
          </li>

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

export default connect(mapStateToProps, { setCurrentUser })(NavBar);