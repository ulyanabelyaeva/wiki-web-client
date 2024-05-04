import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: null
}

const pageWindowSlice = createSlice({
    name: 'pageWindow',
    initialState,
    reducers: {
      updatePage(state, action){
          state.page = action.payload
      }
    }
  });
  
  export const pageWindowReducer = pageWindowSlice.reducer;
  
  export const { updatePage } = pageWindowSlice.actions;