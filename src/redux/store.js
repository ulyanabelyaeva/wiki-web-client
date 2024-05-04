import { configureStore } from "@reduxjs/toolkit";
import { treeReducer } from "./slice/TreeSlice";

const store = configureStore({
    reducer: {
        treeReducer: treeReducer
    }
});

export default store;