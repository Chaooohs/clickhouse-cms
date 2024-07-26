import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goods: [],
  status: 'idle',
  error: null,
}

export const fetchGoods = createAsyncThunk(
  'categoryId/fetchCategoryId',
  async (params) => {
    const { categoryId, title, offset, limit } = params
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}&title=${title}&offset=${offset}&limit=${limit}`)
    const data = await res.json()
    return data
  }
)

const goodsSlice = createSlice({
  name: "categoryId",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success'
        state.goods = action.payload
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export default goodsSlice.reducer;