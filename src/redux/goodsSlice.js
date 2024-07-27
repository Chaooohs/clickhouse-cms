import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goods: [],
  status: 'idle',
  error: null,
  update: false,
  postStatus: 'idle',
  delStatus: false,
}

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (params) => {
    const { categoryId, title, offset, limit } = params
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}&title=${title}&offset=${offset}&limit=${limit}`, {
      method: 'GET',
    })
    const data = await res.json()
    return data
  }
)

export const newGood = createAsyncThunk(
  'goods/newGood',
  async (a) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(a)
    })
    const data = await res.json()
    return data;
  }
)

export const deleteGoods = createAsyncThunk(
  'goods/deleteGoods',
  async (id) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    return data
  }
)

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    updateGoodsFetch: (state, action) => {
      state.update = action.payload
    },
    togglePostStatus: (state, action) => {
      state.postStatus = action.payload
    },
    resetDelStatus: (state, action) => {
      state.delStatus = action.payload
    },
  },

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
      .addCase(newGood.pending, (state) => {
        state.postStatus = 'in progress'
      })
      .addCase(newGood.fulfilled, (state, action) => {
        state.postStatus = 'success'
        state.goods.push(action.payload)
      })
      .addCase(newGood.rejected, (state, action) => {
        state.postStatus = 'fail'
        state.error = action.error.message
      })
      .addCase(deleteGoods.fulfilled, (state, action) => {
        state.delStatus = action.payload
      })
  },
})

export const { updateGoodsFetch, togglePostStatus, resetDelStatus } = goodsSlice.actions
export default goodsSlice.reducer;