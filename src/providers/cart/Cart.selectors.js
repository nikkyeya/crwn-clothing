import { createSelector } from 'reselect'

// A function that takes the whole state and returns just a slice of it
// It will take the whole reducer state that we can then utilize
// INPUT SELECTORS - usually returns a large piece of a state
const selectCart = (state) => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuanitity, cartItem) =>
        accumulatedQuanitity + cartItem.quantity,
      0
    )
)

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuanitity, cartItem) =>
        accumulatedQuanitity + cartItem.quantity * cartItem.price,
      0
    )
)
