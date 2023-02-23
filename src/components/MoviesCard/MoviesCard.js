// компонент одной карточки фильма.
import { useContext } from "react";
import { useLocation } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const isOnSavedMovies = pathname === "/saved-movies";

	const handleCheckLikeStatus = () => {
		const isSaved = props.savedMovies.some(
			(movie) => movie.movieId === props.movie.id
		);

		return isSaved;
	};

	console.log("handleCheckLikeStatus", handleCheckLikeStatus());

	const savedMovie = !isOnSavedMovies
		? props.savedMovies.find((movie) => movie.movieId === props.movie.id)
		: props.movie;

	const isSaved = !isOnSavedMovies ? handleCheckLikeStatus() : true;

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
		props.onDelete(savedMovie);
	};

	// сохранение фильма на апи
	const handleLikeClick = () => {
		if (isSaved) {
			handleDeleteClick();
		} else if (!isSaved) {
			handleSaveMovie();
		}
	};

	console.log("isSaved:", isOnSavedMovies);

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
					type="button"
					aria-label="Нравится"
					onClick={handleLikeClick}
				></button>
			</div>
			<p className="movie__duration">{props.duration}</p>
		</div>
	);
}

export default MoviesCard;
