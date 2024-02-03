import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import cartHeart from "./slices/cartHeart";
import loadProduct from "./slices/loadProduct";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        heart: cartHeart,
        reload: loadProduct
    }
})

export default store;