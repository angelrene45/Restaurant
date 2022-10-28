import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authToken: '',
    authorization: false,
    role:''
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload.token;
      state.role = action.payload.role;
      state.authorization = true;
    },
    deleteToken: (state) => {
      state.authToken = '';
      state.role = '';
      state.authorization = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, deleteToken } = loginSlice.actions