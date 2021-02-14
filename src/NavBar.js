import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  
  render() {
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
        to='/Search'
        exact
        className='nav-link'
        >Search</NavLink>

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