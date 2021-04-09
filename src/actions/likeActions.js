import { POST_LIKE, DELETE_LIKE } from './types';

export const handleLike = userAndTweet => dispatch => {
  const userLikedTweet = userAndTweet.tweet.likes.find(like => like.user_id === userAndTweet.currentUser.user.id) 

  if (userLikedTweet) {
    console.log('deleting like')
    fetch(`http://localhost:3001/api/v1/likes/${userLikedTweet.id}`, {
      method: 'DELETE'
    })
    .then(dispatch({
      type: DELETE_LIKE
    }))
    
  } else {
    console.log("adding like")
    fetch('http://localhost:3001/api/v1/likes', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        user_id: userAndTweet.currentUser.user.id,
        tweet_id: userAndTweet.tweet.id,
        likes_per_tweet: userAndTweet.tweet.likes.length + 1
      })
    })
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: POST_LIKE,
        payload: data.like.likes_per_tweet
      })
    )
  }
}
