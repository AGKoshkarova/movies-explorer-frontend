// компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.

// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
import { useState, Suspense, lazy, useContext, useEffect } from "react";

import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

// import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { useLocalStorage } from "../../utils/useLocalStorage";

import BadResults from "../BadResults/BadResults";

//const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));

function Movies(props) {
	const [checkedCheckBox, setCheckedCheckBox] = useLocalStorage(
		"searchMoviesChecked",
		false
	);

	const handleFindMovies = (searchTerm) => {
		props.onFindMovies(searchTerm);
	};

	const handleCheckLikeStatus = (data) => {
		props.onCheckStatus(data);
	};

	const handleSaveMovie = (movie) => {
		props.onSave(movie);
	};

	const handleDeleteMovie = (movie) => {
		props.onDelete(movie);
	};

	return (
		<div className="movies">
			<SearchForm
				onSubmit={handleFindMovies}
				checkedCheckBox={checkedCheckBox}
				setCheckedCheckBox={setCheckedCheckBox}
			/>
			{/* 	{props.isLoading ? (
				<Preloader />
			) : ( */}
			{props.notFound ? (
				<BadResults />
			) : (
				<MoviesCardList
					movies={props.movies}
					//movies={movies}
					onCheckStatus={handleCheckLikeStatus}
					onSave={handleSaveMovie}
					savedMovies={props.savedMovies}
					onDelete={handleDeleteMovie}
					isChecked={checkedCheckBox}
				/>
			)}

			{/* )} */}
		</div>
	);
}

export default Movies;
