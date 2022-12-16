import { createSlice } from '@reduxjs/toolkit'

export const dashInfoSlice = createSlice({
  name: 'dashInfo',
  initialState: {
    links: {
      login: '',
      links: []
    }
  },
  reducers: {
    setLinks: (state, action) => {
      state.links = action.payload.links;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLinks } = dashInfoSlice.actions