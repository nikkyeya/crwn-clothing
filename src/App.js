import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/home/HomePage.component'
import CheckoutPage from './pages/checkout/Checkout.component'
import ShopPage from './pages/shop/ShopPage.component'
import SignInSignUpPage from './pages/signIn-signUp/SignInSignUpPage.component'
import Header from './components/header/Header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import CurrentUserContext from './contexts/current-user/current-user.context'

// Custom Styles
import './App.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        // Save snapshot data to our component state
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          })
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className='App'>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.currentUser ? (
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

export default App
