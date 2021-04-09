import { FETCH_CURRENT_USER, LOADING_USER, FETCH_USERS, CREATE_USER, DELETE_USER, EDIT_USER, LOGIN_USER, LOGIN_FAILED, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  currentUser: null,
  users: [], 
  loading: true
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      }
    case LOADING_USER:
      return {
        ...state,
        loading: false
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
    
    case EDIT_USER:
      const editedUsers = state.users.filter(user => user.id !== action.payload.id)
      return {
        ...state,
        users: [...editedUsers, action.payload]
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