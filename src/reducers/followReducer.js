import { FOLLOW, UNFOLLOW } from '../actions/types';

const initialState = {
  following: [],
  followers: []
}

export default followReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        following: [...state.following, action.payload]
      }
    default:
      return state
  }
}