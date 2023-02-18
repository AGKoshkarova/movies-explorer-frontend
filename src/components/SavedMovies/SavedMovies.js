//компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
 
//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList></MoviesCardList>
        </div>
    )
};

export default SavedMovies;