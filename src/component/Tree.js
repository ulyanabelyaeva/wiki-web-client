import React, { useEffect, useState } from "react";
import { fetchData } from "../data/data";
import DirectoryView from "../entity/TreeView";
import PageView from "../entity/PageView";

function TreeComponent() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData().then((fetchData) => {
            setData(fetchData);
        });
    }, []);


    return <div>
        <DirectoryView directories={data?.directories} />
        <PageView pages={data?.pages} />
    </div>;
}

export default function Tree() {
    return <TreeComponent />;
}