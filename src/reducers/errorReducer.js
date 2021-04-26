import { TWEET_ERROR, SIGNUP_ERROR, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  errors: null,
}

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case TWEET_ERROR:
      return {
        ...state,
        errors: action.payload
      }
      case SIGNUP_ERROR:
        return {
          ...state,
          errors: action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state
  }
}