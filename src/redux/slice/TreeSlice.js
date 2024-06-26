import instanse from '../../axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clear } from './PageWindowSlice';

const initialState = {
  tree: null,
  status: 'loading',
  openTreeMobile: false
};

export const fetchTree = createAsyncThunk('fetchTree', async () => {
  const { data } = await instanse.get('/tree/read');
  return data;
});

export const fetchCreationDirectory = createAsyncThunk('fetchCreationDirectory', async (params) => {
  await instanse.post('/directory/create', params);
});

export const fetchCreationPage = createAsyncThunk('fetchCreationPage', async (params) => {
  await instanse.post('/page/create', params);
});

export const fetchUpdatingPage = createAsyncThunk('fetchUpdatingPage', async (params) => {
  await instanse.post('/page/update', params);
});

export const fetchUpdatingDirectory = createAsyncThunk('fetchUpdatingDirectory', async (params) => {
  await instanse.post('/directory/update', params);
});

const TreeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    clearTreeState(state) {
      state.tree = null;
      state.status = 'loading'
    },
    swithOpenTreeMobile(state) {
      state.openTreeMobile = !state.openTreeMobile;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTree.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTree.fulfilled, (state, action) => {
      state.tree = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchTree.rejected, (state) => {
      state.tree = null;
      state.status = 'error';
    });
  }
});

export const treeReducer = TreeSlice.reducer;

export const { clearTreeState, swithOpenTreeMobile } = TreeSlice.actions;