import { FETCH_FOLLOWS, FOLLOW, UNFOLLOW } from './types';

const token = localStorage.getItem("token")

export const fetchFollows = () => dispatch => {
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


export const follow = (user) => dispatch => {
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

}

export const unfollow = (user) => dispatch => {
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

}