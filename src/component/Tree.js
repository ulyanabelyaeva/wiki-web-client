import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DirectoryView from "../entity/DirectoryView";
import PageView from "../entity/PageView";
import { fetchCreationDirectory, fetchCreationPage, fetchTree, clearTreeState } from "../redux/slice/TreeSlice";
import { clearPageState } from "../redux/slice/PageWindowSlice";
import '../style/Tree.css';

function TreeComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const logout = async () => {
        await window.localStorage.removeItem('token');
        dispatch(clearPageState());
        dispatch(clearTreeState());
        return navigate("/login");
    };

    return <div className="tree-container">
        <div className="tree-header">
            <div className="dropdown">
                <button className="dropdown-menu-btn"/>
                <div className="dropdown-content">
                    <button onClick={createNewPage} className="dropdown-item-btn">Добавить страницу</button>
                    <button onClick={createNewDirectory} className="dropdown-item-btn">Добавить раздел</button>
                    <button onClick={logout} className="dropdown-item-btn">Выйти</button>
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