import React from "react";
import { Navigate } from "react-router-dom";

import Tree from "./Tree";
import PageWindow from './PageWindow';
import { isAuth } from "../redux/slice/AuthSlice";

import "../style/Workspace.css"

function Workspace() {
    if (!isAuth()) {
        return <Navigate to="/login" />
    }

    return <div className="workspace">
        <Tree />
        <PageWindow />
    </div>
}

export default Workspace;