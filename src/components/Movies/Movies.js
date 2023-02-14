// компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.

// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import { movies } from "../../utils/movies";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {

	return (
		<div className="movies">
			<SearchForm />
			<MoviesCardList movies={movies}/>
			<div className="movies__btn-container">
				<button className="movies__button" type="button">Ещё</button>
			</div>
		</div>
	);
};

export default Movies;
