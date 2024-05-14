import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TagView from "../entity/TagView";
import { fetchAllUserTags } from "../redux/slice/PageWindowSlice";
import "../style/Tag.css"

function Tag() {
    const tags = useSelector(state => state.pageWindowReducer.tags);

    const [allTags, setAllTags] = useState([]);
    useEffect(() => {
        const fetchTags = async () => {
            const data = await fetchAllUserTags();
            setAllTags(data);
        };
        fetchTags();
    }, [])
    const options = allTags.map((tag) => {
        return <option key={tag.id}>{tag.name}</option>;
     });

    return <div className="tag-zone-container">
        {tags && tags.map((tag) => (
            <TagView tag={tag} />
        ))}
    </div>
}

export default Tag;