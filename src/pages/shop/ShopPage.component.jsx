import React from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collectionsOverview/CollectionsOverview.component'
import CollectionPage from '../collectionPage/CollectionPage.component'

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route
      exact
      path={`${match.path}/:collectionId`}
      component={CollectionPage}
    />
  </div>
)

export default ShopPage
