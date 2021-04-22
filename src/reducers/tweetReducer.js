import { FETCH_TWEETS, USER_TWEETS, FETCH_USER_SPECIFIC_TWEETS, POST_TWEET, DELETE_TWEET, EDIT_TWEET, TWEET_INITIALIZE } from '../actions/types';

const initialState = {
  userAndFollowedTweets: [],
  userTweets: [],
  userSpecificTweets: [],
  tweet: {}
}
 
export default function tweetReducer(state = initialState, action) {
  
  switch(action.type) {
    case FETCH_TWEETS:
      return {
        ...state,
        userAndFollowedTweets: action.payload
      }
    case USER_TWEETS:
      return {
        ...state,
        userTweets: action.payload
      }
    case FETCH_USER_SPECIFIC_TWEETS:
      return {
        ...state,
        userSpecificTweets: action.payload
      }
    case POST_TWEET:
      return {
        ...state,
        userAndFollowedTweets: [...state.userAndFollowedTweets, action.payload],
        userTweets: [...state.userTweets, action.payload]
      }
    case DELETE_TWEET:
      const filteredTweets = state.userAndFollowedTweets.filter(tweet => tweet.id !== action.payload.id)
      const userFilteredTweets = state.userTweets.filter(tweet => tweet.id !== action.payload.id)
      return { 
        ...state,
        userAndFollowedTweets: filteredTweets,
        userTweets: userFilteredTweets
      }
    case EDIT_TWEET:
      const editedTweets = state.userAndFollowedTweets.filter(tweet => tweet.id !== action.payload.id)
      return {
        ...state,
        userAndFollowedTweets: [...editedTweets, action.payload]
      }
    case TWEET_INITIALIZE:
      return initialState
    default: 
      return state;
  }
}