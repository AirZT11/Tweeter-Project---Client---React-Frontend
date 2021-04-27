// API URL
export const API_URL = 'https://tweeter-heroku-backend.herokuapp.com/api/v1';
// export const API_URL = 'http://localhost:3001/api/v1';

// TWEET TYPES
export const FETCH_TWEETS = 'FETCH_TWEETS';
export const USER_TWEETS = 'USER_TWEETS';
export const FETCH_USER_SPECIFIC_TWEETS = 'FETCH_USER_SPECIFIC_TWEETS';
export const POST_TWEET = 'POST_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const EDIT_TWEET = 'EDIT_TWEET';
export const TWEET_INITIALIZE = 'TWEET_INITIALIZE';

// USER TYPES
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const LOADING_USER = 'LOADING_USER';
export const FETCH_USERS = 'FETCH_USERS'
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER'
export const EDIT_USER = 'EDIT_USER';
export const LOGIN_USER= 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const FETCH_FOLLOWED_USERS = 'FETCH_FOLLOWED_USERS';
export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
export const USER_INITIALIZE = 'USER_INITIALIZE';

// FOLLOW TYPES
export const FETCH_FOLLOWS = 'FETCH_FOLLOW';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const FOLLOW_INITIALIZE = 'FOLLOW_INITIALIZE';

// ERROR TYPES
export const TWEET_ERROR = 'TWEET_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';