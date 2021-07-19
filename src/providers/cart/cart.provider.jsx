import React, { createContext, useState, useEffect } from 'react'
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartItemsTotal,
} from './Cart.utils'

export const CartContext = createContext({
  hidden: true,
  cartItemsCount: 0,
  cartItemsTotal: 0,
  cartItems: [],
  toggleHidden: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
})

// Provider Wrapper Component
const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [cartItemsTotal, setCartItemsTotal] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const toggleHidden = () => setHidden(!hidden)
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item))
  const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item))
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item))

  // Update variables when state dependencies changes
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
    setCartItemsTotal(getCartItemsTotal(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        hidden,
        cartItemsCount,
        cartItems,
        toggleHidden,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
