import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data = await res.json()
    return data
  }
)

export const newCategory = createAsyncThunk(
  'categories/newCategory',
  async (a, dispatch) => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(a)
    })
    const data = await res.json()
    dispatch(addCategory(data));
  }
)

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'in progress'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'fail'
        state.error = action.error.message
      })
  },
})

export const { addCategory } = categoriesSlice.actions
export default categoriesSlice.reducer;
