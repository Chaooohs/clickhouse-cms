import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  status: 'idle',
  editStatus: 'idle'
}

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'GET',
    })
    const data = await res.json()
    return data
  }
)

export const editSingleProduct = createAsyncThunk(
  'product/editSingleProduct',
  async (params) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: params.title,
        price: params.price,
        description: params.description,
      })
    })
    const data = await res.json()
    return data
  }
)

const goodsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'success'
        state.product = action.payload
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
      .addCase(editSingleProduct.fulfilled, (state, action) => {
        state.editStatus = 'success'
      })
  },
})

export const {} = goodsSlice.actions
export default goodsSlice.reducer;