
const Search = props => {
  console.log(props)
  
    return (
      <div>
        <h1>Search Tweets!</h1>
        <form>
          <label htmlFor='search'>Search</label><br />
          <input type='text' />
        </form>
      </div>
    )
  }

export default Search