import { API_URL, FETCH_TWEETS, USER_TWEETS, FETCH_USER_SPECIFIC_TWEETS, POST_TWEET, DELETE_TWEET, EDIT_TWEET, TWEET_ERROR, TWEET_INITIALIZE } from './types';

// import { fetchUsers, fetchFollowedUsers, fetchFollowers } from '../actions/userActions';
// import { fetchFollows } from '../actions/followActions';

const TWEET_API_URL = API_URL + '/tweets';

export const fetchTweets = () => dispatch => {
  let token = localStorage.getItem("token");
  // console.log(token)
    fetch(`${TWEET_API_URL}_users`, {
      method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(tweets =>
      dispatch({
        type: FETCH_TWEETS,
        payload: tweets
      })
    )
    // .then(() => dispatch(fetchUsers()))
    // .then(() => dispatch(fetchFollows()))
};

export const userTweets = (currentUser) => dispatch => {
  let token = localStorage.getItem("token");  
    fetch(`${TWEET_API_URL}_users`, {
      method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data.filter(tweet => (tweet.user.id === currentUser.user.id)))
    .then(tweets => 
      dispatch({
        type: USER_TWEETS,
        payload: tweets
      })
    )
    // .then(() => dispatch(fetchFollowedUsers(currentUser.user)))
    // .then(() => dispatch(fetchFollowers(currentUser.user)))
    
}

export const fetchUserSpecificTweets = (user) => dispatch => {
  if (user) {
    fetch(API_URL + '/user_tweets', {
      method: "GET",
        headers: {
          "UserId": user.id
        }
    })
    .then(response => response.json())
    .then(data => 
      dispatch({
        type: FETCH_USER_SPECIFIC_TWEETS,
        payload: data
      })
    )
  }
}

export const createTweet = (tweetFormData) => dispatch => {
  fetch(TWEET_API_URL, {
    method: "POST",
    body: tweetFormData
  })
  .then(response => response.json())
  .then(tweet => {
    if (tweet.errors) {
      dispatch({
        type: TWEET_ERROR,
        payload: tweet.errors
      })
    } else {
      dispatch({
        type: POST_TWEET,
        payload: tweet.tweet
      })
    }
  })
  .catch(error => {
    console.log(error)
  })
  
};

export const deleteTweet = (tweet) => dispatch => {
  fetch(`${TWEET_API_URL}/${tweet.id}`, {
    method: "DELETE"
  })
  .then(() => 
    dispatch({
      type: DELETE_TWEET,
      payload: tweet
    })  
  )
}

export const editTweet = (tweetData) => dispatch => {
  const editURL = TWEET_API_URL + `/${tweetData.id}`;
  fetch(editURL, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      message: tweetData.message,
      user_id: tweetData.user_id
    })
  })
  .then(response => response.json())
  .then(tweet => 
    dispatch({
      type: EDIT_TWEET,
      payload: tweet
    })
  )
}

export const tweetInitialize = () => dispatch => {
  dispatch({
    type: TWEET_INITIALIZE
  })
}