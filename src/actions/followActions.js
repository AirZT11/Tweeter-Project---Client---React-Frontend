import { API_URL, FETCH_FOLLOWS, FOLLOW, UNFOLLOW, FOLLOW_INITIALIZE } from './types';
import { fetchTweets } from './tweetActions';

// const API_URL = 'https://tweeter-heroku-backend.herokuapp.com/api/v1';

export const fetchFollows = () => dispatch => {
  let token = localStorage.getItem("token")
  if (token) {
    fetch(API_URL + '/profile', {
      method: "GET",
      headers: {
        "Authentication": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => data.user.followed_users.map(follow => {
      return follow.followee_id
    }))
    .then(followData => 
      dispatch({
        type: FETCH_FOLLOWS,
        payload: followData
      }))
  }
}

export const follow = (user) => dispatch => {
  let token = localStorage.getItem("token")
  fetch(`${API_URL}/users/${user.id}/follow`, {
    method: "POST",
      mode: "cors",
      headers: {
        "Authentication": `Bearer ${token}`
      },
      body: JSON.stringify({
        id: user.id
      })
  })
  .then(response => response.json())
  .then(data => 
    dispatch({
      type: FOLLOW,
      payload: data.followData.id
    })
  )
  .then(() => dispatch(fetchTweets()))
}

export const unfollow = (user) => dispatch => {
  let token = localStorage.getItem("token")
  fetch(`${API_URL}/users/${user.id}/unfollow`, {
    method: "POST",
      mode: "cors",
      headers: {
        "Authentication": `Bearer ${token}`
      },
      body: JSON.stringify({
        id: user.id
      })
  })
  .then(response => response.json())
  .then(data => 
    dispatch({
      type: UNFOLLOW,
      payload: data.followData.id
    })
  )
  .then(() => dispatch(fetchTweets()))
}

export const followInitialize = () => dispatch => {
  dispatch({
    type: FOLLOW_INITIALIZE
  })
}