import { configureStore } from "@reduxjs/toolkit";

import auth from './authSlice'
import categories from './categories'
import goods from './goodsSlice'
import filters from './filtersSlice'

export const store = configureStore({
  reducer: {
    auth,
    categories,
    goods,
    filters,
  }
})