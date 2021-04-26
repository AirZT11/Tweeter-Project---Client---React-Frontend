import React from 'react';
import '../css/SignIn.css'

const SignUpForm = ({handleChange, handleFileChange, handleSubmit, state}) => {

  return (
    <div>
      {/* {console.log(state)} */}
      <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name </label><br />
          <input id='name' name='name' type='text' value={state.name} placeholder="name" onChange={handleChange} />
          <br /><br />
          <label htmlFor='email'>Email </label><br />
          <input id='email' name='email' type='text' value={state.email} placeholder="email" onChange={handleChange} />
          <br /><br />
          <label htmlFor='username'>Username </label><br />
          <input id='username' name='username' type='text' value={state.username} placeholder='username' onChange={handleChange}/>
          <br /><br />
          <label htmlFor='password'>Password </label><br />
          <input id='password' name='password' type='password' value={state.password} onChange={handleChange}/>
          <br /><br />
          <label htmlFor='image'>Upload Image </label><br />
          <input type='file' id='image' name='image' accept="image/*" multiple={false} onChange={handleFileChange}></input><br /><br />

          {/* <label htmlFor='confirmation'>Confirmation: </label><br />
          <input id='confirmation' name='confirmation' type='password' onChange={handleChange}/>
          <br /><br /> */}
          <input type='submit' /><br />
        </form>
    </div>
  )
}

export default SignUpForm;