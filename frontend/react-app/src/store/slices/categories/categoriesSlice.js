import { createSlice } from '@reduxjs/toolkit'

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState: {
    categories: [],
    categoriesWithFoods: [],
    isLoading: false
  },
  reducers: {
    startLoadingCategories: (state) => {
      state.isLoading = true;
    },
    setCategories: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    },
    setCategoriesWithFoods: (state, action) => {
      state.isLoading = false;
      state.categoriesWithFoods = action.payload.categoriesWithFoods;
    },
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingCategories, setCategories, setCategoriesWithFoods } = categorieSlice.actions