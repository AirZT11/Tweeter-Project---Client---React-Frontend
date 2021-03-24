import { FETCH_CURRENT_USER, FETCH_USERS, CREATE_USER, LOGIN_USER, LOGIN_FAILED, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  currentUser: null,
  users: []
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      }
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case LOGIN_FAILED:
      alert(action.payload)
      return {
        ...state,
        currentUser: null
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
}