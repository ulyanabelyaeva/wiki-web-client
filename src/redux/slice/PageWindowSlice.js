import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../axios";

const initialState = {
  page: null,
  content: null,
  tags: [],
  updatedContent: null,
  editMode: false
}

export const fetchPageInfo = createAsyncThunk('fetchPageInfo', async (uuid) => {
  let path = '/page/read-advanced/' + uuid;
  const { data } = await instanse.get(path);
  return data;
});

export const fetchPage = createAsyncThunk('fetchPage', async (id) => {
  let path = '/page/read/' + id;
  const { data } = await instanse.get(path);
  return data;
});

export const fetchAllUserTags = async () => {
  const { data } = await instanse.get('/tag/read');
  return data;
}

const pageWindowSlice = createSlice({
  name: 'pageWindow',
  initialState,
  reducers: {
    updatePage(state, action) {
      state.page = action.payload
    },
    switchEditMode(state, action) {
      state.editMode = action.payload
    },
    updateContent(state, action) {
      state.updatedContent = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPageInfo.fulfilled, (state, action) => {
      const payload = action.payload;
      state.content = payload.content;
      state.tags = payload.tags;
    });
    builder.addCase(fetchPageInfo.rejected, (state) => {
      state.content = null;
      state.tags = [];
    });
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.page = action.payload;
    });
  }
});

export const pageWindowReducer = pageWindowSlice.reducer;

export const { updatePage, switchEditMode, updateContent } = pageWindowSlice.actions;