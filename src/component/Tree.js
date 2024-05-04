import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectoryView from "../entity/TreeView";
import PageView from "../entity/PageView";
import { fetchTree } from "../redux/slice/TreeSlice";

function TreeComponent() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.treeReducer.tree);
    console.log("STATE", data)
    useEffect(() => {
        dispatch(fetchTree())
    }, []);


    return <div>
        <DirectoryView directories={data?.directories} />
        <PageView pages={data?.pages} />
    </div>;
}

export default function Tree() {
    return <TreeComponent />;
}