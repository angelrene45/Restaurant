import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    authToken: '', 
    userData: {}, // json response from backend 
    userType: 'guest' // 'guest', 'user', 'customer'
  },
  reducers: {
    setToken: (state, action) => {
      state.status = 'authenticated';
      state.authToken = action.payload.token;
      state.userData = action.payload.userData;
      state.userType = action.payload.userType;
    },
    deleteToken: (state) => {
      state.status = 'not-authenticated';
      state.authToken = '';
      state.userData = {};
      state.userType = 'guest';
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, deleteToken, checkingCredentials } = authSlice.actions