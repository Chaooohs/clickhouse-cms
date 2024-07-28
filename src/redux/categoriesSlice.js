import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  singleCategory: {},
  status: 'idle',
  error: null,
  update: false,
  postStatus: 'idle',
  editStatus: 'idle',
  delStatus: false,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data = await res.json()
    return data
  }
)
export const fetchSingleCategory = createAsyncThunk(
  'categories/fetchSingleCategory',
  async (id) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    const data = await res.json()
    return data
  }
)

export const newCategory = createAsyncThunk(
  'categories/newCategory',
  async (a) => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(a)
    })
    const data = await res.json()
    return data
  }
)

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async (params) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: params.name,
      })
    })
    const data = await res.json()
    return data
  }
)

export const deleteCategory = createAsyncThunk(
  'goods/deleteCategory',
  async (id) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    return data
  }
)

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategoryFetch: (state, action) => {
      state.update = action.payload
    },
    categoryPostStatus: (state, action) => {
      state.postStatus = action.payload
    },
    resetCategoryChangeStatus: (state, action) => {
      state.editStatus = action.payload
    },
    resetCategoryDelStatus: (state, action) => {
      state.delStatus = action.payload
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
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.singleCategory = action.payload
      })
      .addCase(newCategory.pending, (state) => {
        state.postStatus = 'in progress'
      })
      .addCase(newCategory.fulfilled, (state, action) => {
        state.postStatus = 'success'
        state.categories.push(action.payload)
      })
      .addCase(newCategory.rejected, (state, action) => {
        state.postStatus = 'fail'
        state.error = action.error.message
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.editStatus = 'success'
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.delStatus = action.payload
      })
  },
})

export const { updateCategoryFetch, categoryPostStatus, resetCategoryChangeStatus, resetCategoryDelStatus } = categoriesSlice.actions
export default categoriesSlice.reducer;
