import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../model/productProps";

type heartItem = ProductProps & {
  quantity: number;
  totalPrice: number;
};

type CartState = {
  heartItems: heartItem[];
  totalAmount: number;
  totalQuantity: number;
};

const initialState: CartState = {
  heartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartHeart = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addItemToHeart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.heartItems.find(
        (item) => item.id === newItem.id 
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.heartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          category: newItem.category,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          priceSales: newItem.priceSales,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
      }

      //state.totalAmount = Number(state.heartItems.reduce((total, item) => total));


      console.log(state.totalQuantity);
      // console.log(state.cartItems);
      // console.log(newItem);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.heartItems.find((item) => item.id === id);

      if (existingItem) {
        state.heartItems = state.heartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = Number( state.heartItems.reduce((total, item) =>Number(total) + Number(item.price) * Number(item.quantity),0));
    },
  },
});

export const cartActionsHeart = cartHeart.actions;

export default cartHeart.reducer;
