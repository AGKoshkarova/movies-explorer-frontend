// компонент, который управляет отрисовкой карточек фильмов на страницу
// и их количеством
import { useState, useEffect, useMemo, useCallback } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import { useResize } from "../../utils/useResize";

function MoviesCardList(props) {
	// состояние отслеживания кол-ва нажатий на кнопку ещё
	/* const [index, setIndex] = useState(0); */

	// состояние кол-ва подгружаемых фильмов после сабмита
	const [cardListSize, setCardListSize] = useState(0);

	// кол-во элементов в массиве подгружаемых фильмов
	const [indexOfMovies, setIndexOfMovies] = useState(cardListSize);

	// состояние кол-ва подгружаемых фильмов в ряд по кнопке "ещё"
	const [numberOfMovies, setNumberOfMovies] = useState(0);

	// кол-во фильмов подгружаемых после сабмита формы
	//const initialMovies = props.movies.slice(0, indexOfMovies);

	const {width, isScreenM, isScreenL, isScreenXL } = useResize();

	// массив отображаемых фильмов
	const visibleMovies =  props.movies.slice(0, indexOfMovies);

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

	// кол-во фильмов подгружаемых после сабмита формы
/* 	const visibleMovies = useMemo(() => {
		if (indexOfMovies === 0) {
			handleCardListSize();
			return props.movies.slice(0, indexOfMovies);
		} else {
			return props.movies.slice(0, indexOfMovies);
		}
	}, [indexOfMovies, props.movies, handleCardListSize]); */

	console.log(visibleMovies);
	console.log(indexOfMovies);

	// функция показа/скрытия кнопки "ещё
	const buttonClassName =
		props.movies.length > visibleMovies.length
			? "movies-card-list__button"
			: "movies-card-list__button_disabled";

	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return hours + "ч " + minutes + "м";
	}

	// отрисовка фильмов по кнопке "Еще"
	const findMoreMovies = () => setIndexOfMovies(numberOfMovies + indexOfMovies);

	useEffect(() => {
		setIndexOfMovies(cardListSize);
		handleCardListSize();
	}, [cardListSize, numberOfMovies, handleCardListSize, width]);

	//	useEffect(() => {
	//		const movies = cardListSize + numberOfMovies * index;

	//		const newArray = [];

	//		for (let i = 0; i < props.movies.length; i++) {
	//			if (i < movies) {
	//				newArray.push(props.movies[i]);
	//			}
	//		}

	//		setVisibleMovies(newArray);
	//	}, [index, props.movies, cardListSize, numberOfMovies]);

	return (
		<>
			<ul className="movies-card-list">
				{visibleMovies.map((movie) => {
					return (
						<li className="movies-card-list__element" key={movie.id}>
							<MoviesCard
								name={movie.nameRU}
								image={movie.image.url}
								duration={getTimeFromMins(movie.duration)}
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
