import { FETCH_FOLLOWS, FOLLOW, UNFOLLOW, FOLLOW_INITIALIZE } from './types';
import { fetchTweets } from './tweetActions';

export const fetchFollows = () => dispatch => {
  let token = localStorage.getItem("token")
  if (token) {
    fetch(`http://localhost:3001/api/v1/profile`, {
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
  fetch(`http://localhost:3001/api/v1/users/${user.id}/follow`, {
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
  fetch(`http://localhost:3001/api/v1/users/${user.id}/unfollow`, {
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