import React from "react";

import "../style/Tag.css"

const TagView = ({ tag }) => {
    return (
      <div className="tag-container">
        {tag.name}
      </div>
    );
  };
  
  export default TagView;