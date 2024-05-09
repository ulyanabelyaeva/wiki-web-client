import React from "react";

import Tree from "./Tree";
import PageWindow from './PageWindow';

import "../style/Workspace.css"

function Workspace() {
    return <div className="workspace">
        <Tree />
        <PageWindow />
    </div>
}

export default Workspace;