import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../axios";

const initialState = {
  page: null,
  content: null,
  editMode: false
}

export const fetchPageContent = createAsyncThunk('fetchPageContent', async (uuid) => {
  let path = '/page/read-content/' + uuid;
  const { data } = await instanse.get(path);
  return data;
});

const pageWindowSlice = createSlice({
  name: 'pageWindow',
  initialState,
  reducers: {
    updatePage(state, action) {
      state.page = action.payload
    },
    switchEditMode(state, action) {
      state.editMode = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPageContent.fulfilled, (state, action) => {
      state.content = action.payload;
    });
    builder.addCase(fetchPageContent.rejected, (state) => {
      state.content = null;
    });
  }
});

export const pageWindowReducer = pageWindowSlice.reducer;

export const { updatePage, switchEditMode } = pageWindowSlice.actions;