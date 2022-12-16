import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    allBoards: []
  },
  reducers: {
    setBoards: (state, action) => {
      state.allBoards = action.payload.boards;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setBoards } = boardSlice.actions