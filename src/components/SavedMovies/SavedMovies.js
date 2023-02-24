import { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
	const [checkedCheckBox, setCheckedCheckBox] = useState(false);

	// состояние поиска фильмов
	const [isFiltered, setIsFiltered] = useState(false);

	const handleFindSavedMovies = (searchTerm) => {
		props.onFindSavedMovies(searchTerm);
		setIsFiltered(true);
	};

	// удаление фильма с нашего api
	const handleDeleteMovie = (movie) => {
		props.onDelete(movie);
	};

	const handleCheckLikeSavedStatus = (movie) => {
		props.onCheckSavedStatus(movie);
	};

	useEffect(() => {
		if (checkedCheckBox) {
			props.savedMovies.filter((movie) => movie.duration <= 40);
		}
	});

	return (
		<div className="saved-movies">
			<SearchForm
				onSubmit={handleFindSavedMovies}
				checkedCheckBox={checkedCheckBox}
				setCheckedCheckBox={setCheckedCheckBox}
			/>
			<MoviesCardList
				savedMovies={isFiltered ? props.filteredSavedMovies : props.savedMovies}
				movies={isFiltered ? props.filteredSavedMovies : props.movies}
				onDelete={handleDeleteMovie}
				onCheckSavedStatus={handleCheckLikeSavedStatus}
				isChecked={checkedCheckBox}
			/>
		</div>
	);
}

export default SavedMovies;
