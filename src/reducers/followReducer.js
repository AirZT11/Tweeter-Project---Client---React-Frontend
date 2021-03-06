import { FETCH_FOLLOWS, FOLLOW, UNFOLLOW, FOLLOW_INITIALIZE } from '../actions/types';

const initialState = {
  following: [],
  followers: []
}

export default function followReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_FOLLOWS:
      return {
        ...state,
        following: action.payload
      }
    case FOLLOW:
      return {
        ...state,
        following: [...state.following, action.payload]
      }
    case UNFOLLOW:
      const filteredFollowing = state.following.filter(followUserId => action.payload !== followUserId)
      return {
        ...state,
        following: filteredFollowing
      }
    case FOLLOW_INITIALIZE:
      return initialState
    default:
      return state
  }
}