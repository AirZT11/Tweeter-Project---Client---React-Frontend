import { combineReducers } from 'redux';
import tweetReducer from './tweetReducer';
import userReducer from './userReducer';
import followReducer from './followReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  tweetsData:  tweetReducer,
  userData: userReducer,
  followData: followReducer,
  errorData: errorReducer
})