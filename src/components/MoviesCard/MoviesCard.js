// компонент одной карточки фильма.
function MoviesCard(props) {

	const movieLikeButtonClassName = `${
		props.isLiked === true ? "movie__like-btn" : "movie__like-btn_disabled"
	  }`;

	return (
		<div className="movie">
			<img className="movie__image" src={props.image} alt={props.name} />
			<div className="movie__container">
				<h4 className="movie__name">{props.name}</h4>
				<button
					className={movieLikeButtonClassName}
					type="button"
					aria-label="Нравится"
				></button>
			</div>
			<p className="movie__duration">1ч 42м</p>
		</div>
	);
}

export default MoviesCard;
