import React from 'react';
import { connect } from 'react-redux';
import '../css/SignIn.css';

const ErrorCard = ({ errors, }) => {
  // const [errorStyle, setErrorStyle] = useState('block')

  // if (tweetFormErrors.length > 0) {
  //   setErrorStyle('none')
  // }

  let errorList = () => {
    let key;
    let arr = []
    for (key in errors ) {
      arr.push(key + ' ' + errors[key])
    }
    return arr;
  }

  return (
    <div>
      <ul>
        {errorList().map(e => <li className='error' >{e}</li>)}   
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errorData.errors
})

export default connect(mapStateToProps)(ErrorCard)