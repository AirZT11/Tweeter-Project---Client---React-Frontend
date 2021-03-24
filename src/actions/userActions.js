import { FETCH_CURRENT_USER, FETCH_USERS, CREATE_USER, LOGIN_USER, LOGIN_FAILED, SET_CURRENT_USER } from './types';

export const fetchCurrentUser = () => dispatch => {
  const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3001/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(user => {
        dispatch({
          type: FETCH_CURRENT_USER,
          payload: user
        })
      }) 
    } else {
      console.log('no token available. manually login')
      // go to sign up page or
      // go to login page and make user sign in
    }
}

export const fetchUsers = () => dispatch => {
  fetch(`http://localhost:3001/api/v1/users`)
  .then(response => response.json())
  .then(users => { 
    dispatch({
      type: FETCH_USERS,
      payload: users
    })
  })
}

export const createUser = (formData) => dispatch => {
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    mode: 'cors', // why do you use cors?
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      user: {
        name: formData.name,
        email: formData.email,
        username: formData.username,

        //obviously going to need some level of encryption for passwords
        password: formData.password, 
        // password_confirmation: this.state.confirmation
    }
    })
  }).then(response => response.json())
  .then(data => dispatch({
    type: CREATE_USER,
    payload: data
  }))
}
export const loginUser = (userInputData) => dispatch => {
  fetch(LOGIN_API_URL, {
    method: "POST",
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      user: userInputData
    })
  })
  .then(resp => resp.json())
  .then(user => { 
    if (user.error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: user.error
      })
    } else {
      localStorage.setItem("token", user.jwt)
      dispatch({
        type: LOGIN_USER,
        payload: user
      })
    }
  })
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

// PRIVATE
const LOGIN_API_URL = 'http://localhost:3001/api/v1/login'