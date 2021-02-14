import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import '.../NavBar.css';
//import App from './App';
import Login from './components/Login'
import SignUp from './components/containers/SignUpContainer'
import Search from './components/Search'

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