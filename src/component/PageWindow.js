import { useSelector, useDispatch } from "react-redux";
import Markdown from "./Markdown";
import { switchEditMode, fetchPageContent } from "../redux/slice/PageWindowSlice";
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

    const switchModeToEdit = () => {
        dispatch(switchEditMode(true));
    }

    const switchModeToRead = async () => {
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
                    {editMode ? <div></div> : <button onClick={switchModeToEdit} className="page-window-btn">Редактировать</button>}
                </div>
                <Markdown />
                <div className="page-window-footer">
                    {editMode ? <button className="page-window-btn" onClick={switchModeToRead}>Сохранить</button> : <div></div>}
                </div>
            </div>
        </div>;
    }
}

export default function PageWindow() {
    return <PageWindowComponent />
}