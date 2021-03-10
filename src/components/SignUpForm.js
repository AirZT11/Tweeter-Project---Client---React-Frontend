// currently not adding a password confirmation till the concept of authorizing users and logging in is understood

import React from 'react';

const SignUpForm = ({handleChange, handleSubmit}) => {

  return (
    <div>
      <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name: </label><br />
          <input id='name' name='name' type='text' placeholder="name" onChange={handleChange} />
          <br /><br />
          <label htmlFor='email'>Email: </label><br />
          <input id='email' name='email' type='text' placeholder="email" onChange={handleChange} />
          <br /><br />
          <label htmlFor='username'>Username: </label><br />
          <input id='username' name='username' type='text' placeholder='username' onChange={handleChange}/>
          <br /><br />
          <label htmlFor='password'>Password: </label><br />
          <input id='password' name='password' type='password' onChange={handleChange}/>
          <br /><br />
          {/* <label htmlFor='confirmation'>Confirmation: </label><br />
          <input id='confirmation' name='confirmation' type='password' onChange={handleChange}/>
          <br /><br /> */}
          <input type='submit' /><br />
        </form>
    </div>
  )
}

export default SignUpForm;