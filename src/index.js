import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import NavBar from './NavBar'
import App from './App';
import Login from './components/Login'
import SignUp from './components/containers/SignUpContainer'
import Search from './components/Search'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Router>
        <NavBar />
        <Route exact path='/' component={App}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/search' component={Search}></Route>
        <Route exact path='/signUp' component={SignUp}></Route>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
