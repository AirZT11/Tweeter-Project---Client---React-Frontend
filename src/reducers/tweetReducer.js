import { FETCH_TWEETS, POST_TWEET } from '../actions/types';

const initialState = {
  tweets: [],
  tweet: {}
}
 
export default function(state = initialState, action) {
  switch(action.type) {
    default: 
      return state;
  }
}