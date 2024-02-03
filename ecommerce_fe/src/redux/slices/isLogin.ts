import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    isLogin: false,
    username: null,
}

const isLogin = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
      isLogin:(state, action)=>{
        state.isLogin = action.payload
      }

  }
});

export const {} = isLogin.actions

export default isLogin.reducer