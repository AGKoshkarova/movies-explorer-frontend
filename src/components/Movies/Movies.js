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

const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));

function Movies(props) {
	//const currentUser = useContext(CurrentUserContext);

	// состояние поискового запроса
 	const [searchTerm, setSearchTerm] = useState("");

	// состояние результатов поиска
	const [searchResults, setSearchResults] = useState([]);

	// отрисовка найденных фильмов
 	const findMovies = () => {
		moviesApi.getMovies().then((res) => {
			const foundMovies = res.filter((movie) =>
				(movie.nameRU || movie.nameEN).includes(searchTerm.toLowerCase())
			);
			setSearchResults(foundMovies);
		});
	};

	const handleMovieLike = (movie) => {
		props.onChangeLike(movie);
	};


	return (
		<div className="movies">
			<SearchForm
				searchTerm={searchTerm}
				onSubmit={findMovies}
				onChange={setSearchTerm}
			/>
			<Suspense fallback={<Preloader />}>
				<MoviesCardList movies={searchResults} onChangeLike={handleMovieLike} />
			</Suspense>
		</div>
	);
}

export default Movies;
