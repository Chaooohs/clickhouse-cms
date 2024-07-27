import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newGoods: false,
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleNewGoods: (state, action) => {
      state.newGoods = action.payload
    },
  }
})

export const { toggleNewGoods } = toggleSlice.actions
export default toggleSlice.reducer