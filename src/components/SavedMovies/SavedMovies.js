//компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
 
//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { savedMovies } from "../../utils/movies";

function SavedMovies(props) {
    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList movies={savedMovies}></MoviesCardList>
        </div>
    )
};

export default SavedMovies;