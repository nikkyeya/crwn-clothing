import { createContext } from 'react'
import SHOP_DATA from './Shop.data'

// Shop data is the initial value of our context
const CollectionsContext = createContext(SHOP_DATA)

export default CollectionsContext
