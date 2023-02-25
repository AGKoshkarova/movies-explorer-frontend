import { useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { useLocalStorage } from "../../utils/useLocalStorage";

import BadResults from "../BadResults/BadResults";

import { SHORT_FILM } from "../../utils/constants";

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

	useEffect(() => {
		if (checkedCheckBox) {
			props.movies.filter((movie) => movie.duration <= SHORT_FILM);
		}
	});

	return (
		<div className="movies">
			<SearchForm
				onSubmit={handleFindMovies}
				checkedCheckBox={checkedCheckBox}
				setCheckedCheckBox={setCheckedCheckBox}
			/>
			{props.notFound ? (
				<BadResults />
			) : (
				<MoviesCardList
					movies={props.movies}
					onCheckStatus={handleCheckLikeStatus}
					onSave={handleSaveMovie}
					savedMovies={props.savedMovies}
					onDelete={handleDeleteMovie}
					isChecked={checkedCheckBox}
				/>
			)}
		</div>
	);
}

export default Movies;
