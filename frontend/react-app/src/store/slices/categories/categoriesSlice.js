import { createSlice } from '@reduxjs/toolkit'

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategories } = categorieSlice.actions