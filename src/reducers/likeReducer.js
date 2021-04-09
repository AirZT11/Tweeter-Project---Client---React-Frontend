import { POST_LIKE, DELETE_LIKE } from '../actions/types';

// updating the likes state doesn't really matter does it? 
// the purpose of doing it at the current moment is to rerender
// not to actually update the state as it's not for any particular tweet
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