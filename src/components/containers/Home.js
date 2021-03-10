import TweetList from './TweetList'
import TweetForm from './TweetForm'

const Home = props => (

        <div className="App">
          
          < TweetForm 
              tweetsApiURL={props.TWEETS_API_URL} 
              updateTweetList={props.updateTweetList} 
              currentUser={props.currentUser}
          />

          < TweetList 
              tweetsApiURL={props.TWEETS_API_URL} 
              currentUser={props.currentUser}
              tweets={props.allTweets} 
              handleDeleteTweet={props.handleDeleteTweet} 
          />  
        </div>
      
)

export default Home;