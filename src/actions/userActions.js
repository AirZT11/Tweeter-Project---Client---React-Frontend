import { FETCH_CURRENT_USER, LOADING_USER, FETCH_USERS, CREATE_USER, DELETE_USER, EDIT_USER, LOGIN_USER, LOGIN_FAILED, SET_CURRENT_USER, FETCH_FOLLOWED_USERS, FETCH_FOLLOWERS } from './types';

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
      dispatch({
        type: LOADING_USER
      })
      // go to sign up page or
      // go to login page and make user sign in
    }
}

export const fetchUsers = () => dispatch => {
  fetch(USER_API_URL)
  .then(response => response.json())
  .then(users => { 
    dispatch({
      type: FETCH_USERS,
      payload: users
    })
  })
}

export const createUser = (data) => dispatch => {
  console.log(data)
  const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('image', data.image);

  fetch(USER_API_URL, {
    method: 'POST',
    // mode: 'cors', // why do you use cors?
    body: formData
  }).then(response => response.json())
  .then(data => dispatch({
    type: CREATE_USER,
    payload: data
  }))
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
}

export const editUser = (data) => dispatch => {
  const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('image', data.image);

  fetch(USER_API_URL + '/' + data.id, {
    method: 'PATCH',
    body: formData
  }).catch(error=>console.log(error))
  .then(response => response.json())
  .then(data => dispatch({
    type: EDIT_USER,
    payload: data
  }))
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

// PRIVATE
const LOGIN_API_URL = 'http://localhost:3001/api/v1/login';
const USER_API_URL = 'http://localhost:3001/api/v1/users';