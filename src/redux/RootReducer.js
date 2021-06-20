import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import UserReducer from './user/User.reducer'
import CartReducer from './cart/Cart.reducer'
import DirectoryReducer from './directory/Directory.reducer'
import ShopReducer from './shop/shop.reducer'

const persistConfig = {
  key: 'root', // where inside reducer we want to start storing everything
  storage, // this is the storage we import from lib/storage
  whitelist: ['cart'], // array containing the string names of every reduers that we want to store
}

const rootReducer = combineReducers({
  user: UserReducer,
  cart: CartReducer,
  directory: DirectoryReducer,
  shop: ShopReducer,
})

export default persistReducer(persistConfig, rootReducer)
