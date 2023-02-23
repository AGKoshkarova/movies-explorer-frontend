// компонент, который управляет отрисовкой карточек фильмов на страницу
// и их количеством
import { useState, useEffect, useMemo, useCallback, useContext } from "react";

import { useLocation } from "react-router";

import MoviesCard from "../MoviesCard/MoviesCard";

import { useResize } from "../../utils/useResize";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCardList(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const isOnSavedMovies = pathname === "/saved-movies";

	// состояние кол-ва подгружаемых фильмов после сабмита
	const [cardListSize, setCardListSize] = useState(0);

	// кол-во элементов в массиве подгружаемых фильмов
	const [indexOfMovies, setIndexOfMovies] = useState(cardListSize);

	// состояние кол-ва подгружаемых фильмов в ряд по кнопке "ещё"
	const [numberOfMovies, setNumberOfMovies] = useState(0);

	const { width, isScreenM, isScreenL, isScreenXL } = useResize();

	// массив отображаемых фильмов
	const visibleMovies = props.movies.slice(0, indexOfMovies);

	const handleCardListSize = useCallback(() => {
		if (!isScreenM && !isScreenL && !isScreenXL) {
			setCardListSize(5);
			setNumberOfMovies(1);
		} else if (!isScreenL && !isScreenXL) {
			setCardListSize(8);
			setNumberOfMovies(2);
		} else if (!isScreenXL) {
			setCardListSize(9);
			setNumberOfMovies(3);
		} else {
			setCardListSize(16);
			setNumberOfMovies(4);
		}
	}, [isScreenL, isScreenM, isScreenXL]);

	// функция показа/скрытия кнопки "ещё
	const buttonClassName =
		props.movies.length > visibleMovies.length
			? "movies-card-list__button"
			: "movies-card-list__button_disabled";

	const getTimeFromMins = (mins) => {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return hours + "ч " + minutes + "м";
	};

	// отрисовка фильмов по кнопке "Еще"
	const findMoreMovies = () => setIndexOfMovies(numberOfMovies + indexOfMovies);

	const handleSaveMovie = (movie) => {
		props.onSave(movie);
	};

	// удаление фильма с нашего api
	const handleDelete = (movie) => {
		props.onDelete(movie);
	};

	useEffect(() => {
		setIndexOfMovies(cardListSize);
		handleCardListSize();
	}, [cardListSize, numberOfMovies, handleCardListSize, width]);

	return (
		<>
			<ul className="movies-card-list">
				{visibleMovies
					.filter((movie) => (props.isChecked ? movie.duration <= 40 : movie))
					.map((movie) => {
						return (
							<li
								className="movies-card-list__element"
								key={!isOnSavedMovies ? movie.id : movie._id}
							>
								<MoviesCard
									name={movie.nameRU}
									duration={getTimeFromMins(movie.duration)}
									movie={movie}
									onSave={handleSaveMovie}
									onDelete={handleDelete}
									movies={props.movies}
									savedMovies={props.savedMovies}
								/>
							</li>
						);
					})}
			</ul>
			<div className="movies-card-list__btn-container">
				{props.movies.length > visibleMovies.length ? (
					<button
						className={buttonClassName}
						type="button"
						onClick={findMoreMovies}
					>
						Ещё
					</button>
				) : null}
			</div>
		</>
	);
}

export default MoviesCardList;
