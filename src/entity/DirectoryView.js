import React, { useState } from "react";
import { useDispatch } from "react-redux";
import '../style/Tree.css';
import PageView from "./PageView";
import { fetchCreationDirectory, fetchCreationPage, fetchTree } from "../redux/slice/TreeSlice";

const DirectoryNode = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const createNewDirectory = async() => {
    let request = {
      parentDirectoryId: directory.id,
      name: 'Новый раздел',
      createdAt: '2024-04-05T14:29:00+03:00'
    };
    await dispatch(fetchCreationDirectory(request));
    dispatch(fetchTree())
  };

  const createNewPage = async() => {
    let request = {
      directoryId: directory.id,
      name: 'Новая страница',
      createdAt: '2024-04-05T14:29:00+03:00'
    };
    await dispatch(fetchCreationPage(request));
    dispatch(fetchTree())
  };

  return (
    <div className="node">
      <div className="node-content">
        <div>
          <button onClick={toggleNode} className="toggle-icon" />
          <span>{directory.name}</span>
        </div>
        <div className="dropdown">
        <button className="node-plus-button">+</button>
            <div className="dropdown-content">
              <button onClick={createNewPage} className="dropdown-item-button">Добавить страницу</button>
              <button onClick={createNewDirectory} className="dropdown-item-button">Добавить раздел</button>
            </div>
        </div>
      </div>
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