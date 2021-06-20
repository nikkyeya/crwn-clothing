import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey =
    'pk_test_51J2klBAFVlxn2TwPFA6cWnOe0eD2uWdAhbH9ZK3HeYI4iCkNbdTx799Iw55TRu2zarP04jOVbQJ6irvC7YuPE5ct00kBy0KjDy'

  const onToken = (token) => {
    console.log(token)
    alert('Payment Successful')
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeButton
