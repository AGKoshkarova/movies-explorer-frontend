// форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

import { useLocalStorage } from "../../utils/useLocalStorage";

import { useState } from "react";

import { useLocation } from "react-router-dom";

function SearchForm(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const isOnSavedMovies = pathname === "/saved-movies";

	// инпут Movies
	const [searchInputMovies, setSearchInputMovies] = useLocalStorage(
		"searchInput",
		""
	);

	// инпут SavedMovies
	const [searchInputSavedMovies, setSearchInputSavedMovies] = useState("");

	const handleSavedMoviesSubmit = (evt) => {
		evt.preventDefault();
		props.onSubmit(searchInputSavedMovies);
	};

	const handleMoviesSubmit = (evt) => {
		evt.preventDefault();
		props.onSubmit(searchInputMovies);
	};

	const handleInputMoviesChange = (evt) => {
		setSearchInputMovies(evt.target.value);
	};

	const handleInputSavedMoviesChange = (evt) => {
		setSearchInputSavedMovies(evt.target.value);
	};

	return (
		<div className="search-form">
			<div className="search-form__container">
				<form
					className="search-form__form"
					name="movies-form"
					onSubmit={
						isOnSavedMovies ? handleSavedMoviesSubmit : handleMoviesSubmit
					}
				>
					<input
						className="search-form__input"
						id="movie-input"
						type="text"
						name="movie"
						placeholder="Фильм"
						value={
							isOnSavedMovies ? searchInputSavedMovies : searchInputMovies || ""
						}
						autoComplete="off"
						required
						onChange={
							isOnSavedMovies
								? handleInputSavedMoviesChange
								: handleInputMoviesChange
						}
					></input>
					<button className="search-form__btn" type="submit"></button>
				</form>
			</div>
			<FilterCheckbox
				id={pathname === "/movies" ? "movies" : "saved-movies"}
				checkedCheckBox={props.checkedCheckBox}
				setCheckedCheckBox={props.setCheckedCheckBox}
			/>
		</div>
	);
}

export default SearchForm;
