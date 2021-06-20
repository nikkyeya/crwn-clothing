import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/Cart.actions'
import CustomButton from '../customButton/CustomButton.component'
import './CollectionItem.styles.scss'

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton
        inverted
        className='custom-button'
        onClick={() => addItem(item)}
      >
        Add to cart
      </CustomButton>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(CollectionItem)
