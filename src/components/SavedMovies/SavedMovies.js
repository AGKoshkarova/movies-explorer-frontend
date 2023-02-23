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


	return (
		<div className="saved-movies">
			<SearchForm
				// searchTerm={searchTerm}
				onSubmit={handleFindSavedMovies}
				// onChange={setSearchTerm}
			/>
			<MoviesCardList
				savedMovies={props.savedMovies}
				movies={props.movies}
				onDelete={handleDeleteMovie}
				onCheckSavedStatus={handleCheckLikeSavedStatus}
			/>
		</div>
	);
}

export default SavedMovies;
