import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newGoods: false,
  changeGoods: false,
  newCategory: false,
  changeCategory: false,
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
    toggleChangeCategory: (state, action) => {
      state.changeCategory = action.payload
    },
  }
})

export const { toggleNewGoods, toggleChangeGoods, toggleNewCategory, toggleChangeCategory, } = toggleSlice.actions
export default toggleSlice.reducer