import { useDispatch } from 'react-redux';
import { updatePage } from '../redux/slice/PageWindowSlice'

import '../style/Tree.css';

const PageNode = ({ page }) => {
  const dispatch = useDispatch();
  const updatePageState = () => {
    dispatch(updatePage(page));
  }

  return (
    <div className="node">
      <button className="page-icon" />
      <button onClick={updatePageState} className='page-window-button'>{page.name}</button>
    </div>
  );
};

const PageView = ({ pages }) => {
  return (
    <div className="tree-view">
      {pages && pages.map((page) => (
        <PageNode key={page.id} page={page} />
      ))}
    </div>
  );
};

export default PageView;