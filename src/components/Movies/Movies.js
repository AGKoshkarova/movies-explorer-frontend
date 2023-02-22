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

//const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));

function Movies(props) {
	// состояние поискового запроса
	/* 	const [searchTerm, setSearchTerm] = useState("");

	// результат поиска или ранее найденные фильмы отображаемые при первой загрузке страницы
	const [foundMovies, setFoundMovies] = useLocalStorage("movies", []);

	// отрисовка найденных фильмов
	const findMovies = () => {
		moviesApi.getMovies().then((res) => {
			const foundMovies = res.filter((movie) =>
				(movie.nameRU || movie.nameEN).includes(searchTerm.toLowerCase())
			);
			setFoundMovies(foundMovies);
		});
	}; */
	const handleFindMovies = (searchTerm) => {
		props.onFindMovies(searchTerm);
	};

	const handleCheckLikeStatus = (data) => {
		props.onCheckStatus(data);
	};

	/* const handleCheckLikeStatus = (movie) => {
		props.onCheckLike(movie);
	}; */

	const handleSaveMovie = (movie) => {
		props.onSave(movie)
	}

	const handleDeleteMovie = (movie) => {
		props.onDelete(movie)
	}

	return (
		<div className="movies">
			<SearchForm onSubmit={handleFindMovies} />
			{props.isLoading ? (
				<Preloader />
			) : (
				<MoviesCardList
					movies={props.movies}
					onCheckStatus={handleCheckLikeStatus}
					// isSaved={props.isSaved}
					onSave={handleSaveMovie}
					savedMovies={props.savedMovies}
					onDelete={handleDeleteMovie}
				/>
			)}
		</div>
	);
}

export default Movies;
