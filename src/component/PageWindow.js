import { useSelector } from "react-redux";
import Markdown from "./Markdown";
import '../style/PageWindow.css';

function PageWindowComponent() {
    const page = useSelector(state => state.pageWindowReducer.page)

    return <div className="page-window">
        {page?.fileUUID}
    </div>;
}

export default function PageWindow(){
    return <PageWindowComponent/>
}