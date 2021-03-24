import { FETCH_TWEETS, USER_TWEETS, POST_TWEET, DELETE_TWEET, EDIT_TWEET } from './types';

// fetchTweets initially returns a function, which is a part of Thunk's features
export const fetchTweets = () => dispatch => {
    fetch(tweet_api_url)
    .then(response => response.json())
    .then(tweets => 
      dispatch({
        type: FETCH_TWEETS,
        payload: tweets
      })
    );
};

export const userTweets = (currentUser) => dispatch => {
  fetch(tweet_api_url)
    .then(response => response.json())
    .then(data => data.filter(tweet => (tweet.user.id === currentUser.user.id)))
    .then(tweets => 
      dispatch({
        type: USER_TWEETS,
        payload: tweets
      })
    );
}

export const createTweet = (tweetFormData) => dispatch => {
  fetch(tweet_api_url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(tweetFormData)
  })
  .then(response => response.json())
  .then(tweet => 
    dispatch({
      type: POST_TWEET,
      payload: tweet
    })
  )
};

export const deleteTweet = (tweet) => dispatch => {
  fetch(`${tweet_api_url}/${tweet.id}`, {
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
  const editURL = tweet_api_url + `/${tweetData.id}`;
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


// PRIVATE
const tweet_api_url = 'http://localhost:3001/api/v1/tweets'

