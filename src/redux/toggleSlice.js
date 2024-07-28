import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newGoods: false,
  changeGoods: false,
  newCategory: false,
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleNewGoods: (state, action) => {
      state.newGoods = action.payload
    },
    toggleChangeGoods: (state, action) => {
      state.changeGoods = action.payload
    },
    toggleNewCategory: (state, action) => {
      state.newCategory = action.payload
    },
  }
})

export const { toggleNewGoods, toggleChangeGoods, toggleNewCategory} = toggleSlice.actions
export default toggleSlice.reducer