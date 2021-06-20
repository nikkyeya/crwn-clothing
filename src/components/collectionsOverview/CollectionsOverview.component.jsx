import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collectionPreview/CollectionPreview.component'
import './CollectionsOverview.styles.scss'

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollections }) => (
      <CollectionPreview key={id} {...otherCollections} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionsOverview)
