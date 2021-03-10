import React from 'react';
import { NavLink } from 'react-router-dom';


//import App from './App';

const NavBar = (props) => {
  let logout = () => {
    props.setCurrentUser(null)
    localStorage.clear();
  }

  if (props.logged_in) {
    return (
      <div className='nav-bar'>
        
        <NavLink
          to='/'
          exact
          className='nav-link'
        >Home</NavLink>
        
        <NavLink
          to='/profile'
          exact
          className='nav-link'
        >Profile</NavLink>

        <NavLink
          to='/Search'
          exact
          className='nav-link'
        >Search</NavLink>

        <NavLink 
          to="/login" 
          className='nav-link' 
          onClick={logout}
        >Logout</NavLink>
      </div>
    ) 
  } else {
    return(
      <div className='nav-bar'>
        <NavLink
          to='/'
          exact
          className='nav-link'
        >Home</NavLink>

        <NavLink
          to='/SignUp'
          exact
          className='nav-link'
        >Sign Up</NavLink>

        <NavLink
          to='/Login'
          exact
          className='nav-link'
          >Login</NavLink>    
      </div>
    )
  }
          
          
    
   
  
  
}

export default NavBar