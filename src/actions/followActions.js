import { FOLLOW, UNFOLLOW } from './types';

export const follow = (user) => dispatch => {
  fetch(`http://localhost:3001/api/v1/users/${user.id}/follow`, {
    method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        id: user.id
      })
  })
  .then(response => response.json())
  .then(data => console.log(data)
    // dispatch({
    //   type: FOLLOW,
    //   payload: 
    // })
  )

}