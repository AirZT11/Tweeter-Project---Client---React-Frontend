import React, { Component } from 'react';
import '../../css/TweetList.css';
import '../../css/Profile.css';
import '../../css/Images.css';
import PhotoIcon from '@material-ui/icons/Photo';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { createTweet } from '../../actions/tweetActions';
import ErrorCard from '../ErrorCard';
import { clearErrors } from '../../actions/errorActions';

class TweetForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      image: null,
      previewImageStyle: 'block',
    }
  }
  
  getInitialState = () => this.setState({
    message: '',
    image: null
  })

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  handleFileChange = (event) => {
    this.setState({
      image: event.target.files[0]
    })
    this.previewImage(event)
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
      formData.append('message', this.state.message)
      formData.append('user_id', this.props.currentUser.id)
      if (this.state.image !== null) formData.append('image', this.state.image)
    this.props.createTweet(formData)
    this.getInitialState()
    if (this.state.image !== null) event.target[1].value = null;
    this.setState({
      previewImageStyle: 'none'
    })
    this.props.clearErrors();
  }

  onKeyPress = (e) => {
    if(e.which === 13) {
      this.handleSubmit(e);
    }
  }

  // conditional function to check if user has profile pic
  picExist = ()=> {
    let profilePic = '';
    if (this.props.currentUser.image) {
      profilePic = this.props.currentUser.image.url;
    } else {
      profilePic = null;
    }
    return profilePic
  }
  
  //conditional to check if photo is avaialble to upload
  picName = () => {
    if (this.state.image !== null) return this.state.image.name
  }

  // function to show a preview of selected photo to upload
  previewImage = (event) => {
    let reader = new FileReader();
    reader.onload = () => {
      let output = document.getElementById('output_image');
      output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  render () {
    return (
      <div>
        <div className='tweet-card'>
          <span className='tweet_avatar'>
                <Avatar src={this.picExist()}/>
          </span>
    
          <form  className='tweet-body' onSubmit={this.handleSubmit} id="tweet_form" autoComplete='off'>   
            < ErrorCard />
            <span className='tweetInput'>
              <input value={this.state.message} onChange={this.handleChange} onKeyPress={this.onKeyPress} placeholder="What's happening?"></input>
            </span>
            
            <div>
              <label className='image-upload-icon' htmlFor="file-input" title='Upload an image'><PhotoIcon fontSize="large"/></label>
              
              <input className='image-upload' type='file' id='file-input' name='image' accept="image/*" multiple={false} onChange={this.handleFileChange}></input>
              <p>{this.picName()}</p>

              <img id='output_image' className='preview__image' style={{display: this.state.previewImageStyle}}></img>
            </div>

            <input className='tweetButton' type='submit' value="TWEET" style={{float: 'right'}}/>
          </form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser.user,
})

export default connect(mapStateToProps, { createTweet, clearErrors })(TweetForm);

