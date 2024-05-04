import '../style/Tree.css';

const PageNode = ({ page }) => {
  return (
    <div className="node">
      <button className="page-icon" />
      <span>{page.name}</span>
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