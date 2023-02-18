// компонент одной карточки фильма.
function MoviesCard(props) {

	return (
		<div className="movie">
			<img className="movie__image" src={`https://api.nomoreparties.co/${props.image}`} alt={props.name} />
			<div className="movie__container">
				<h4 className="movie__name">{props.name}</h4>
				<button
					/* className={movieLikeButtonClassName} */
					className="movie__like-btn_disabled"
					type="button"
					aria-label="Нравится"
				></button>
			</div>
			<p className="movie__duration">{props.duration}</p>
		</div>
	);
};

export default MoviesCard;
