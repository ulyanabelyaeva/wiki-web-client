import React, { useState } from "react";
import '../style/Tree.css';
import PageView from "./PageView";

const DirectoryNode = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);

  return (
    <div className="node">
      {directory.childDirectories && (
        <button onClick={toggleNode} className="toggle-icon" />
      )}
      <span>{directory.name}</span>
      {isOpen && <DirectoryView directories={directory?.childDirectories} />}
      {isOpen && <PageView pages={directory?.pages} />}
    </div>
  );
};

const DirectoryView = ({ directories }) => {
  return (
    <div className="tree-view">
      {directories && directories.map((directory) => (
        <DirectoryNode key={directory.id} directory={directory} />
      ))}
    </div>
  );
};

export default DirectoryView;