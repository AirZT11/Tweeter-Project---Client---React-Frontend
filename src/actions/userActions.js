import { FETCH_CURRENT_USER, LOADING_USER, FETCH_USERS, CREATE_USER, DELETE_USER, EDIT_USER, LOGIN_USER, LOGIN_FAILED, SET_CURRENT_USER, FETCH_FOLLOWED_USERS, FETCH_FOLLOWERS, SIGNUP_ERROR, USER_INITIALIZE } from './types';

const LOGIN_API_URL = 'http://localhost:3001/api/v1/login';
const USER_API_URL = 'http://localhost:3001/api/v1/users';
const TOKEN = localStorage.getItem("token")

export const createUser = (formData, history) => dispatch => {
  fetch(USER_API_URL, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.errors) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: data.errors
      })
    } else {
      dispatch({
        type: CREATE_USER,
        payload: data.user
      })
      history.push('/login')
    }
  })
}

export const loginUser = (userInputData) => dispatch => {
  fetch(LOGIN_API_URL, {
    method: "POST",
    // mode: 'cors',
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

export const fetchCurrentUser = () => dispatch => {
    if(TOKEN){
      fetch(`http://localhost:3001/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication": `Bearer ${TOKEN}`
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
      dispatch({
        type: LOADING_USER
      })
      // go to sign up page or
      // go to login page and make user sign in
    }
}

export const fetchUsers = () => dispatch => {
  if (TOKEN) {
    fetch(USER_API_URL)
    .then(response => response.json())
    .then(users => { 
      dispatch({
        type: FETCH_USERS,
        payload: users
      })
    })
  }  
}

export const deleteUser = (user, history) => dispatch => {
  fetch(`${USER_API_URL}/${user.id}`, {
    method: "DELETE",
    mode: 'cors'
  })
  .then(response => response.json())
  .then(data => dispatch({
    type: DELETE_USER,
    payload: data
  }))
  history.push('/home')
  localStorage.clear();
}

export const editUser = (data) => dispatch => {
  const formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('image', data.image);

  fetch(USER_API_URL + '/' + data.id, {
    method: 'PATCH',
    body: formData
  })
  .then(response => response.json())
  .then(data => dispatch({
    type: EDIT_USER,
    payload: data
  }))
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const fetchFollowedUsers = user => dispatch => {
  if (user) {
    fetch(`http://localhost:3001/api/v1/following`, {
      method: "GET",
      headers: {
        "UserId": user.id
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: FETCH_FOLLOWED_USERS,
        payload: data
      })
    })
  }
}

export const fetchFollowers = user => dispatch => {
  if (user) {
    fetch(`http://localhost:3001/api/v1/followers`, {
      method: "GET",
      headers: {
        "UserId": user.id
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: FETCH_FOLLOWERS,
        payload: data
      })
    })
  }
}

export const userInitialize = () => dispatch => {
  dispatch({
    type: USER_INITIALIZE
  })  
}