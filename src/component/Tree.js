import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectoryView from "../entity/DirectoryView";
import PageView from "../entity/PageView";
import { fetchCreationDirectory, fetchCreationPage, fetchTree } from "../redux/slice/TreeSlice";
import '../style/Tree.css';

function TreeComponent() {
    const dispatch = useDispatch();
    const tree = useSelector(state => state.treeReducer.tree);
    useEffect(() => {
        dispatch(fetchTree())
    }, []);

    const createNewDirectory = async () => {
        let now = new Date();
        let request = {
            name: 'Новый раздел',
            createdAt: now.toISOString()
        };
        await dispatch(fetchCreationDirectory(request));
        dispatch(fetchTree())
    };

    const createNewPage = async () => {
        let now = new Date();
        let request = {
            name: 'Новая страница',
            createdAt: now.toISOString()
        };
        await dispatch(fetchCreationPage(request));
        dispatch(fetchTree())
    };

    return <div className="tree-container">
        <div className="tree-header">
            <button onClick={createNewPage} className="tree-new-page-btn" />
            <button onClick={createNewDirectory} className="tree-new-directory-btn" />
        </div>
        <DirectoryView directories={tree?.directories} />
        <PageView pages={tree?.pages} />
    </div>;
}

export default function Tree() {
    return <TreeComponent />;
}