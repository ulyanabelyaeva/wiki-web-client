import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Tree from "./Tree";
import PageWindow from './PageWindow';
import { isAuth } from "../redux/slice/AuthSlice";
import { swithOpenTreeMobile } from "../redux/slice/TreeSlice";

import "../style/Workspace.css"

function Workspace() {
    const openTree = useSelector(state => state.treeReducer.openTreeMobile)
    const dispatch = useDispatch();
    
    useEffect(() => { 
        const treeContainer = document.getElementsByClassName('tree-container');
        const openTreeBtn = document.getElementsByClassName('open-tree-btn');
        if (treeContainer[0] === null || treeContainer[0] === undefined || openTreeBtn === null || openTreeBtn === undefined){
            return;
        }
        if (openTree) {
            treeContainer[0].classList.remove('open-tree-container');
            openTreeBtn[0].classList.remove('btn-top-direction')
        } else {
            treeContainer[0].classList.add('open-tree-container');
            openTreeBtn[0].classList.add('btn-top-direction');
        }
    }, [openTree])

    if (!isAuth()) {
        return <Navigate to="/login" />
    }

    const switchTreeOpen = () => {
        const treeContainer = document.getElementsByClassName('tree-container');
        if (openTree) {
            treeContainer[0].classList.remove('open-tree-container')
        } else {
            treeContainer[0].classList.add('open-tree-container');
        }
        dispatch(swithOpenTreeMobile());
    }

    return <div className="workspace">
        <div className="open-tree-btn-container">
            <button className="open-tree-btn" onClick={switchTreeOpen}/>
        </div>
        <Tree />
        <PageWindow />
    </div>
}

export default Workspace;