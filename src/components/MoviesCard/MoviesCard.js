import { useLocation } from "react-router";

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

	const savedMovie = !isOnSavedMovies
		? props.savedMovies.find((movie) => movie.movieId === props.movie.id)
		: props.movie;

	const isSaved = !isOnSavedMovies ? handleCheckLikeStatus() : true;

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
