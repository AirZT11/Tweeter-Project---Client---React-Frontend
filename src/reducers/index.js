import { combineReducers } from 'redux';
import tweetReducer from './tweetReducer';
import userReducer from './userReducer';
import likeReducer from './likeReducer';

export default combineReducers({
  tweetsData:  tweetReducer,
  userData: userReducer,
  likeData: likeReducer
})