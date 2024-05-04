import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectoryView from "../entity/DirectoryView";
import PageView from "../entity/PageView";
import { fetchTree } from "../redux/slice/TreeSlice";
import '../style/Tree.css';
import { fetchCreationDirectory, fetchCreationPage } from "../redux/slice/TreeSlice";

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
        <div className="dropdown-container">
            <div className="dropdown">
                <button className="node-plus-button">+</button>
                <div className="dropdown-content">
                    <button onClick={createNewPage} className="dropdown-item-button">Добавить страницу</button>
                    <button onClick={createNewDirectory} className="dropdown-item-button">Добавить раздел</button>
                </div>
            </div>
        </div>
        <DirectoryView directories={tree?.directories} />
        <PageView pages={tree?.pages} />
    </div>;
}

export default function Tree() {
    return <TreeComponent />;
}