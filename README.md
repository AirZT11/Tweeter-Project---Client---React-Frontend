# README
Welcome to my Tweeter App!
- Tweeter is my version of Twitter. The MVC is to allow a user to post/delete/edit tweets to the page.

A Rails API (Application Programming Interface) is used for the backend
  - RESTful(REpresentation State Transfer) design pattern
  - Using postgreSQL as the database

React is used for the Frontend
  - Bootstrap is used for styling

REACT
- Models
  - Users
    - Username
    - Password
    - has_many tweets
  - Tweets
    - tweet_message
    - likes
    - image
    
REACT
Components

- index
  - app
    - tweetList - Container
      - tweetCard
    - tweetForm