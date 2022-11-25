import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    authToken: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.status = 'authenticated';
      state.authToken = action.payload.token;
    },
    deleteToken: (state) => {
      state.status = 'not-authenticated';
      state.authToken = '';
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, deleteToken, checkingCredentials } = authSlice.actions