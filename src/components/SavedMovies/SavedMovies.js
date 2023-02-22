//компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:

//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
import { useState, useEffect, useContext } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
	// const currentUser = useContext(CurrentUserContext);

	// состояние поискового запроса
/* 	const [searchTerm, setSearchTerm] = useState("");

	// состояние результатов поиска
	const [searchResults, setSearchResults] = useState([]); */

	// сохраненные фильмы
	// const [savedMovies, setSavedMovies] = useState(props.savedMovies);

    // состояние владения фильмом
    // const [isSaved, setIsSaved] = useState("");

	// поиск по сохраненным фильмам
/* 	const findSavedMovies = () => {
		const foundMovies = props.savedMovies.filter((movie) =>
			(movie.nameRU || movie.nameEN).includes(searchTerm.toLowerCase())
		);
		setSearchResults(foundMovies);
	}; */
/* 
	const saveMovie = (movie) => {
		const isSaved =
			movie.owner._id === props.currentUser._id || movie.owner === props.currentUser._id;

		mainApi
			.saveMovie(movie.id, !isSaved)
			.then((newMovie) => {
				setSavedMovies((state) =>
					state.map((c) => (c.id === movie.id ? newMovie : c))
				);
                setIsSaved(props.currentUser._id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteMovie = (movie) => {
		const isSaved =
			movie.owner._id === props.currentUser._id || movie.owner === props.currentUser._id;

		mainApi
			.deleteMovie(movie.id, isSaved)
			.then(() => {
				setSavedMovies((movies) =>
					movies.filter((movie) => movie.id !== movie.movie.id)
				);
				movie.remove();
                setIsSaved(null);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}; */

	const handleFindSavedMovies = (searchTerm) => {
		props.onFindSavedMovies(searchTerm);
	};

	// удаление фильма с нашего api
	const handleDeleteMovie = (movie) => {
		props.onDelete(movie);
	};

	const handleCheckLikeSavedStatus = (movie) => {
		props.onCheckSavedStatus(movie);
	};


	/* useEffect(() => {
		mainApi
			.getSavedMovies()
			.then((res) => {
				setSavedMovies(res);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, []); */

	return (
		<div className="saved-movies">
			<SearchForm
				// searchTerm={searchTerm}
				onSubmit={handleFindSavedMovies}
				// onChange={setSearchTerm}
			/>
			<MoviesCardList
				// savedMovies={props.savedMovies}
				movies={props.movies}
				onDelete={handleDeleteMovie}
				onCheckSavedStatus={handleCheckLikeSavedStatus}
			/>
		</div>
	);
}

export default SavedMovies;
