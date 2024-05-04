import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectoryView from "../entity/DirectoryView";
import PageView from "../entity/PageView";
import { fetchTree } from "../redux/slice/TreeSlice";
import '../style/Tree.css';

function TreeComponent() {
    const dispatch = useDispatch();
    const tree = useSelector(state => state.treeReducer.tree);
    useEffect(() => {
        dispatch(fetchTree())
    }, []);


    return <div className="tree-container">
        <DirectoryView directories={tree?.directories} />
        <PageView pages={tree?.pages} />
    </div>;
}

export default function Tree() {
    return <TreeComponent />;
}