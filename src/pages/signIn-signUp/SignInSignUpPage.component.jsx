import React from 'react'

import SignIn from '../../components/signin/SignIn.component'
import SignUp from '../../components/signUp/SignUp.component'
import './SignInSignUpPage.styles.scss'

const SignInSignUpPage = () => (
  <div className='sign-in-sign-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInSignUpPage
