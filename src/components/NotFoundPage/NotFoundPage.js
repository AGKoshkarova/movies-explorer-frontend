import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }
    return (
        <div className="notFound">
            <h1 className="notFound__title">404</h1>
            <p className="notFound__subtitle">Страница не найдена</p>
            <button className="notFound__btn" type="button" onClick={goBack}>Назад</button>
        </div>
    )
};

export default NotFoundPage;