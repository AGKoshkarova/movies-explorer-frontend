// компонент одной карточки фильма.
import { useContext } from "react";
import { useLocation } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const isOnSavedMovies = pathname === "/saved-movies";

	// Определяем, являемся ли мы владельцем текущего фильма
	// const isSaved = props.movie.owner ? true : false;

	//const isSaved = props.savedMovies.some(
	//	(movie) => movie.movieId === props.movie.id
	//);
	/*  	pathname !== "/saved-movies"
	 		? props.onCheckStatus(props)
	 		: props.onCheckSavedStatus(props); */

	// const isSaved = props.onCheckStatus(props);
	const handleCheckLikeStatus = () => {
		const isSaved = props.savedMovies.some(
			(movie) => movie.movieId === props.movie.id
		);

		return isSaved;
	};

	const handleCheckLikeSavedStatus = () => {
		const isSaved = props.movies.some(
			(movie) => movie.movieId === props.movie.movieId
		);

		return isSaved;
	};

	const isSaved =
		pathname !== "/saved-movies"
			? handleCheckLikeStatus(props)
			: handleCheckLikeSavedStatus(props);

	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const movieLikeButtonClassName = `${
		isSaved ? "movie__like-btn" : "movie__like-btn_disabled"
	}`;

	// сохранение фильма на апи
	const handleSaveMovie = () => {
		props.onSave(props);
	};

	// удаление фильма с нашего api
	const handleDeleteClick = () => {
		props.onDelete(props);
	};

	// сохранение фильма на апи
	const handleLikeСlick = () => {
		if (isSaved) {
			handleDeleteClick();
		} else if (!isSaved) {
			handleSaveMovie();
		}
	};

	return (
		<div className="movie">
			<img
				className="movie__image"
				src={
					!isOnSavedMovies
						? `https://api.nomoreparties.co/${props.movie.image.url}`
						: props.movie.image
				}
				alt={props.name}
			/>
			<div className="movie__container">
				<h4 className="movie__name">{props.name}</h4>
				<button
					className={movieLikeButtonClassName}
					// className="movie__like-btn"
					type="button"
					aria-label="Нравится"
					onClick={handleLikeСlick}
					// onClick={handleLikeСlick}
				></button>
			</div>
			<p className="movie__duration">{props.duration}</p>
		</div>
	);
}

export default MoviesCard;
