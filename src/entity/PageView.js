import { useDispatch, useSelector } from 'react-redux';
import { updatePage, fetchPageContent, fetchPage } from '../redux/slice/PageWindowSlice'
import { fetchUpdatingPage, fetchTree } from '../redux/slice/TreeSlice';

import '../style/Tree.css';

const PageNode = ({ page }) => {
  const content = useSelector(state => state.pageWindowReducer.content);

  const dispatch = useDispatch();
  const updatePageState = () => {
    dispatch(updatePage(page));
    dispatch(fetchPageContent(page.fileUUID))
  }

  const updatePageName = async () => {
    let view = document.getElementById(page.id);
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
        id: page.id,
        name: newName,
        content: content,
        updatedAt: now.toISOString()
      };
      await dispatch(fetchUpdatingPage(request));
      dispatch(fetchPage(page.id))
      dispatch(fetchTree())
    };
    view.replaceWith(area);
    area.focus();
  }

  return (
    <div className="node">
      <button className="page-icon" />
      <button onClick={updatePageState} onDoubleClick={updatePageName} id={page.id} className='page-btn'>{page.name}</button>
    </div>
  );
};

const PageView = ({ pages }) => {
  return (
    <div>
      {pages && pages.map((page) => (
        <PageNode key={page.id} page={page} />
      ))}
    </div>
  );
};

export default PageView;