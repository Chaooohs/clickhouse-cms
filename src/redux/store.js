import { configureStore } from "@reduxjs/toolkit";

import auth from './authSlice'
import categories from './categories'
import goods from './goodsSlice'
import filters from './filtersSlice'
import toggle from './toggleSlice'
import product from './singleProductSlice'

export const store = configureStore({
  reducer: {
    auth,
    categories,
    goods,
    filters,
    toggle,
    product,
  }
})