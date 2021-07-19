import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import CustomButton from '../customButton/CustomButton.component'
import CartItem from '../cartItem/CartItem.component'

import './CartDropdown.styles.scss'

// Context
import { CartContext } from '../../providers/cart/cart.provider'

const CartDropdown = ({ history }) => {
  const { cartItems, toggleHidden } = useContext(CartContext)

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout')
          toggleHidden()
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  )
}

export default withRouter(CartDropdown)
