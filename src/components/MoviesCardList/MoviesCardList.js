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

	// console.log(props.movies);
	// const currentUser = useContext(CurrentUserContext);
	const location = useLocation();
	const pathname = location.pathname;

	const isOnSavedMovies = pathname === "/saved-movies";

	// состояние кол-ва подгружаемых фильмов после сабмита
	const [cardListSize, setCardListSize] = useState(0);

	// кол-во элементов в массиве подгружаемых фильмов
	const [indexOfMovies, setIndexOfMovies] = useState(cardListSize);

	// состояние кол-ва подгружаемых фильмов в ряд по кнопке "ещё"
	const [numberOfMovies, setNumberOfMovies] = useState(0);

	// состояние сохранения фильма
	// const isSaved = props.isSaved;

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

	// массив отображаемых фильмов
	// const visibleMovies = props.movies.slice(0, indexOfMovies);

	// кол-во фильмов подгружаемых после сабмита формы
	/* 	const visibleMovies = useMemo(() => {
		if (indexOfMovies === 0) {
			handleCardListSize();
			return props.movies.slice(0, indexOfMovies);
		} else {
			return props.movies.slice(0, indexOfMovies);
		}
	}, [indexOfMovies, props.movies, handleCardListSize]); */

	//console.log(visibleMovies);
	//console.log(indexOfMovies);

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

	// сохранение фильма на апи
	/* const handleChangeLike = (movie) => {
		props.onChangeLike(movie);
	}; */

	const handleSaveMovie = (movie) => {
		props.onSave(movie);
	};

	// удаление фильма с нашего api
	 const handleDelete = (movie) => {
		props.onDelete(movie);
	};

/*  	const handleCheckLikeStatus = () => {
		const isSaved = props.savedMovies.some(
			(movie) => movie.movieId === props.movies.movie.id
		);

		return isSaved;
	};

	const handleCheckLikeSavedStatus = () => {
		const isSaved = props.savedMovies.some(
			(movie) => movie.movieId === props.movie.id
		);

		return isSaved;
	};

	const isSaved = 
	pathname !== "/saved-movies"
		? handleCheckLikeStatus(props)
		: handleCheckLikeSavedStatus(props); */
 
	/* 
	const saveMovie = (movie) => {
		const isOwn =
			movie.owner._id === currentUser._id ||
			movie.owner === currentUser._id;
		
		const savingMovie = visibleMovies.find(movie);
		mainApi
			.saveMovie(movie, !isOwn)
			.then((res) => {
				visibleMovies.push(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteMovie = (movie) => {
		const isOwn =
			movie.owner._id === currentUser._id ||
			movie.owner === currentUser._id;
		
		mainApi.deleteMovie(movie, isOwn)
		.then((res) => {
			setVisibleMovies((cards) =>
					cards.filter((selectedCard) => selectedCard._id !== card.card._id)
				);
		})
	}; */

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
						<li
							className="movies-card-list__element"
							key={ !isOnSavedMovies ? movie.id : movie._id }
						>
							<MoviesCard
								name={movie.nameRU}
								// image={isSaved ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
								duration={getTimeFromMins(movie.duration)}
								movie={movie}
								// onChangeLike={handleChangeLike}
								onSave={handleSaveMovie}
								onDelete={handleDelete}
								// owner={props.isSaved}
								// owner={props.isSaved ? props.isSaved : null}
								// isSaved={isSaved}
								//onCheckStatus={handleCheckLikeStatus}
								//onCheckSavedStatus={handleCheckLikeSavedStatus}
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
