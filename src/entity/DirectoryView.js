import React, { useState } from "react";
import { useDispatch } from "react-redux";
import '../style/Tree.css';
import PageView from "./PageView";
import { fetchCreationDirectory, fetchCreationPage, fetchUpdatingDirectory, fetchTree } from "../redux/slice/TreeSlice";

const DirectoryNode = ({ directory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const createNewDirectory = async () => {
    let now = new Date();
    let request = {
      parentDirectoryId: directory.id,
      name: 'Новый раздел',
      createdAt: now.toISOString()
    };
    await dispatch(fetchCreationDirectory(request));
    dispatch(fetchTree())
  };

  const createNewPage = async () => {
    let now = new Date();
    let request = {
      directoryId: directory.id,
      name: 'Новая страница',
      createdAt: now.toISOString()
    };
    await dispatch(fetchCreationPage(request));
    dispatch(fetchTree())
  };

  const updateDirectoryName = () => {
    let view = document.getElementById(directory.id);
    let area = document.createElement('input');
    area.className = 'edit-name';
    area.value = view.innerHTML;

    area.onkeydown = function (event) {
      if (event.key == 'Enter') {
        this.blur();
      }
    };

    area.onblur = async () => {
      let newName = area.value;
      view.innerHTML = newName;
      area.replaceWith(view);

      let now = new Date();
      let request = {
        id: directory.id,
        name: newName,
        updatedAt: now.toISOString()
      };
      await dispatch(fetchUpdatingDirectory(request));
      dispatch(fetchTree())
    };
    view.replaceWith(area);
    area.focus();
  }

  return (
    <div className="node">
      <div className="node-content">
        <div>
          <button onClick={toggleNode} className="directory-icon" />
          <span onDoubleClick={updateDirectoryName} id={directory.id}>{directory.name}</span>
        </div>
        <div className="tree-new-item-btns">
          <button onClick={createNewPage} className="tree-new-page-btn"/>
          <button onClick={createNewDirectory} className="tree-new-directory-btn"/>
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