import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/User.selectors'
import './App.css'

import HomePage from './pages/home/HomePage.component'
import CheckoutPage from './pages/checkout/Checkout.component'
import ShopPage from './pages/shop/ShopPage.component'
import SignInSignUpPage from './pages/signIn-signUp/SignInSignUpPage.component'
import Header from './components/header/Header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/User.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        // Save snapshot data to our component state
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' /> // If currentUser exist, then redirect to home page
              ) : (
                <SignInSignUpPage /> // If currentUser is null, then render SignInSignUpPage component
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
