import { POST_LIKE, DELETE_LIKE } from '../actions/types';

const initialState = {
  likes: []
}

export default function likeReducer(state = initialState, action) {
  switch(action.type) {
    case POST_LIKE:
      return {
        ...state,
        likes: action.payload
      }
    case DELETE_LIKE:
      return {
        ...state,
        likes: state.likes - 1
      }
    default:
      return state
  }
}