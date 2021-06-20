import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectCartItems,
  selectCartItemsTotal,
} from '../../redux/cart/Cart.selectors'
import CheckoutItem from '../../components/checkoutItem/CheckoutItem.component'
import StripeButton from '../../components/stripeButton/StripeButton.component'

import './Checkout.styles.scss'

const CheckoutPage = ({ cartItems, cartTotal }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>
      <span>TOTAL: ${cartTotal}</span>
    </div>
    <StripeButton price={cartTotal} />
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartItemsTotal,
})

export default connect(mapStateToProps)(CheckoutPage)
