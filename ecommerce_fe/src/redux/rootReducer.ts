import { combineReducers } from 'redux'
import cartSlice from './slices/cartSlice'
import cartHeart from './slices/cartHeart'
import loadProduct from './slices/loadProduct'
export const rootReducer = combineReducers({
   cart: cartSlice,
   heart:cartHeart,
   reload: loadProduct
    // trong trường hợp có nhiều reducer thì bạn cho vào đây
  })
  export type TReducers = ReturnType<typeof rootReducer>