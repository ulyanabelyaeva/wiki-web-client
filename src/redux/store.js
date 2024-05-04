import { configureStore } from "@reduxjs/toolkit";
import { treeReducer } from "./slice/TreeSlice";
import { pageWindowReducer } from "./slice/PageWindowSlice"

const store = configureStore({
    reducer: {
        treeReducer: treeReducer,
        pageWindowReducer: pageWindowReducer
    }
});

export default store;