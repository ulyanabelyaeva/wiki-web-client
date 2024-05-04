import { useSelector } from "react-redux";
import Markdown from "./Markdown";
import '../style/PageWindow.css';

function PageWindowComponent() {
    const page = useSelector(state => state.pageWindowReducer.page)

    const getFormattedDate = (isoDate) => {
        let date = new Date(isoDate);
        let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        let formattedDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
        return formattedDate;
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
                    <button className="page-window-btn">Редактировать</button>
                </div>
                <Markdown />
                <div className="page-window-footer">
                    <button className="page-window-btn">Сохранить</button>
                </div>
            </div>
        </div>;
    }
}

export default function PageWindow() {
    return <PageWindowComponent />
}