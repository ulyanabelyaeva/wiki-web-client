import { useSelector, useDispatch } from "react-redux";
import Markdown from "./Markdown";
import { switchEditMode, fetchPageContent, fetchPage, updateContent } from "../redux/slice/PageWindowSlice";
import { fetchUpdatingPage } from "../redux/slice/TreeSlice";
import '../style/PageWindow.css';

function PageWindowComponent() {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pageWindowReducer.page)
    const editMode = useSelector(state => state.pageWindowReducer.editMode)
    const updatedContent = useSelector(state => state.pageWindowReducer.updatedContent)

    const getFormattedDate = (isoDate) => {
        let date = new Date(isoDate);
        let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        let formattedDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
        return formattedDate;
    }

    const edit = () => {
        dispatch(switchEditMode(true));
    }

    const save = async () => {
        dispatch(switchEditMode(false));

        let now = new Date();
        let request = {
            id: page.id,
            name: page.name,
            content: updatedContent,
            updatedAt: now.toISOString()
        };
        await dispatch(fetchUpdatingPage(request));
        dispatch(fetchPageContent(page.fileUUID))
        dispatch(fetchPage(page.id))
    }

    const cancel = async () => {
        dispatch(switchEditMode(false));
        dispatch(updateContent(null));
    }

    const downloadPDF = () => {

    }

    if (page === null) {
        return <div className="page-window">

        </div>;
    } else {
        let createdAt = getFormattedDate(page.createdAt);
        let updatedAt = getFormattedDate(page.updatedAt);

        return <div className="page-window">
            <div className="page-window-container">
                <div className="page-window-title">{page.name}</div>
                <div className="page-window-header">
                    <div>
                        <div className="page-window-subtitle">Создано: {createdAt}</div>
                        <div className="page-window-subtitle">Обновлено: {updatedAt}</div>
                    </div>
                    <div className="page-window-header-right">
                        {editMode ? <div></div> : <button onClick={downloadPDF} className="page-window-print-btn" />}
                        {editMode ? <div></div> : <button onClick={edit} className="page-window-btn">Редактировать</button>}
                    </div>
                </div>
                <Markdown />
                <div className="page-window-footer">
                    {editMode ? <button className="page-window-btn && page-window-cancel-btn" onClick={cancel}>Отменить</button> : <div></div>}
                    {editMode ? <button className="page-window-btn" onClick={save}>Сохранить</button> : <div></div>}
                </div>
            </div>
        </div>;
    }
}

export default function PageWindow() {
    return <PageWindowComponent />
}