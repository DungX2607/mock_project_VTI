import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    load: false
}

const loadProduct = createSlice({
  name: "reload",
  initialState,
  reducers: {
        reloadProduct: (state,action)=>{
            state.load = action.payload;
           
        }
        

  },
});

export const reloadProduct = loadProduct.actions

export default loadProduct.reducer