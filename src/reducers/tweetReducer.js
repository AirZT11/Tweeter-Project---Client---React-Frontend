import { FETCH_TWEETS, USER_TWEETS, POST_TWEET, DELETE_TWEET, EDIT_TWEET } from '../actions/types';

const initialState = {
  tweets: [],
  userTweets: [],
  tweet: {}
}
 
export default function tweetReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_TWEETS:
      return {
        ...state,
        tweets: action.payload
      }
    case USER_TWEETS:
      return {
        ...state,
        userTweets: action.payload
      }
    case POST_TWEET:
      return {
        ...state,
        tweets: [...state.tweets, action.payload]
      }
    case DELETE_TWEET:
      const filteredTweets = state.tweets.filter(tweet => tweet.id !== action.payload.id)
      const userFilteredTweets = state.userTweets.filter(tweet => tweet.id !== action.payload.id)
      return { 
        ...state,
        tweets: filteredTweets,
        userTweets: userFilteredTweets
      }
    case EDIT_TWEET:
      const editedTweets = state.tweets.filter(tweet => tweet.id !== action.payload.id)
      return {
        ...state,
        tweets: [...editedTweets, action.payload]
      }
    default: 
      return state;
  }
}