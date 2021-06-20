import React from 'react'

import FormInput from '../formInput/FormInput.component'
import CustomButton from '../customButton/CustomButton.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './SignUp.styles.scss'

class SignUp extends React.Component {
  constructor() {
    super()

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfileDocument(user, { displayName })

      // Reset our form to empty
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <div className='sign-up'>
        <h2 className='title'> I do not have an account</h2>
        <span>Sign up wih your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            name='displayName'
            type='text'
            value={displayName}
            handleChange={this.handleChange}
            label='display name'
            required
          />
          <FormInput
            name='email'
            type='email'
            value={email}
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='confirm password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp
