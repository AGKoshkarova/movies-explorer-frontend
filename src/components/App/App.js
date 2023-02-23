import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router";

import Main from "../Main/Main";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Login from "../Login/Login";
import Register from "../Register/Register";

import { BasicLayout, AuthLayout } from "../Layout/Layout";

import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import { mainApi } from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { useLocalStorage } from "../../utils/useLocalStorage";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
	// текущее расположение
	const { pathname } = useLocation();

	// стейт юзера
	const [currentUser, setCurrentUser] = useState({});

	// состояния открытия навигационного меню
	const [isNavOpen, setIsNavOpen] = useState(false);

	// состояние регитсрации
	const [isRegistered, setIsRegistered] = useState(false);

	// состояние логина
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// состояние работы прелодера
	// const [isPreloading, setIsPreloading] = useState(false);

	// состояние нулевого резульата поиска
	const [notFound, setNotFound] = useState(false);

	// сохраненные фильмы
	const [savedMovies, setSavedMovies] = useState([]);

	// фильмы, полученные с сервера
	const [foundMovies, setFoundMovies] = useLocalStorage("movies", []);

	// фильмы, отфильтрованные поиском
	const [filteredMovies, setFilteredMovies] = useLocalStorage("results", []);

	// фильмы, отфильтрованные поиском
	const [filteredSavedMovies, setFilteredSavedMovies] = useLocalStorage(
		"savedResults",
		[]
	);
	// состояние загрузки страницы
	const [isLoading, setIsLoading] = useState(true)

	// const [results, setResults] = useLocalStorage("results", filteredMovies);

	// состояние сохранения фильма
	// const [isSaved, setIsSaved] = useState(false);

	//объект истории
	const navigate = useNavigate();

	//функция регистрации
	const handleRegister = ({ name, email, password }) => {
		mainApi
			.register(name, email, password)
			.then((res) => {
				if (res.ok) {
					setIsRegistered(true);
					handleLogin({ email, password });
				}
			})
			.catch((err) => {
				/* setIsInfoToolTipOpen(true); */
				console.log(err);
			});
	};

	// логин
	const handleLogin = ({ email, password }) => {
		mainApi
			.login(email, password)
			.then((res) => {
				setIsLoggedIn(true);
				// setCurrentUser(res);
				navigate("/movies");
				console.log(res);
			})
			.catch((err) => {
				//setIsInfoToolTipOpen(true);
				console.log(err);
			});
	};

	// выход изз аккаунта
	const handleSignOut = () => {
		mainApi
			.logout()
			.then(() => {
				setIsLoggedIn(false);
				navigate('/');
				localStorage.clear();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// функции открытия/закрытия панели навигации
	const handleNavClick = () => {
		setIsNavOpen(!isNavOpen);
	};

	const closeNav = () => {
		setIsNavOpen(false);
	};

	// получем фильмы с api
	const getAllMovies = () => {
		moviesApi
			.getMovies()
			.then((res) => {
				setFoundMovies(res);
				setIsLoading(true);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
		// .finally(() => {
		//	setIsLoading(false);
		//});
	};

	// поиск по фильмам в зависимости от наличия данных в хранлилище
	const findMovies = async (searchTerm) => {
		const firstSearch = foundMovies.length <= 0;
		if (firstSearch) {
			const initialMovies = getAllMovies();
			setFilteredMovies(
				initialMovies.filter((movie) =>
					(movie.nameRU || movie.nameEN).includes(
						searchTerm.movie.toLowerCase()
					)
				)
			);
		} else {
			setFilteredMovies(
				foundMovies.filter((movie) =>
					(movie.nameRU || movie.nameEN).includes(
						searchTerm.movie.toLowerCase()
					)
				)
			);
		}
	};

	//console.log(JSON.parse(localStorage.foundMovies));

	// сохранение фильма
	const handleSaveMovie = (data) => {
		//const isSaved = data.owner !== null;
		//const movie = { key: data.owner };
		//const isSaved = movie.hasOwnProperty("key");

		mainApi
			.saveMovie(data.movie /* !isSaved */)
			/*.then((newMovie) => {
			 	setSavedMovies(
					(state) =>
						state.map((movie) =>
							movie.id === data.movie.id ? newMovie : movie
						) // добавляем фильм в сохраненные
				);
			})
			.then((newMovie) => {
				setFoundMovies(
					(state) =>
						state.map((movie) =>
							movie.id === data.movie.id ? newMovie : movie
						) // обновляем фильм в хранилище, меняем состояние лайка
				);
			}) */
			.then((res) => {
				setSavedMovies((movies) => [...movies, res]);
				/* setFoundMovies(
					() =>
						foundMovies.map((movie) =>
							movie.id === data.movie.id ? res : movie
						) // добавляем фильм в сохраненные
				); */
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// удаление фильма на api
	const handleDeleteMovie = (data) => {
		// const isSaved = data.movie.owner === currentUser._id;

		mainApi
			.deleteMovie(data.movie._id /* isSaved */)
			.then(() => {
				setSavedMovies((movies) =>
					movies.filter((movie) => movie.movieId !== data.movie._id)
				);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	};

	const findSavedMovies = (searchTerm) => {
		const foundMovies = savedMovies.filter((movie) =>
			(movie.nameRU || movie.nameEN).includes(searchTerm.toLowerCase())
		);
		setFilteredSavedMovies(foundMovies);
	};

	// управление функциями сохранения/удаления фильмов
	/*  	const handleMovieLike = (data) => {
		const isSaved = savedMovies.some(
			(movie) => movie.movieId === data.movie.id
		);
		if (isSaved) {
			handleSaveMovie(data);
		} else {
			handleDeleteMovie(data);
		}

		return isSaved;
	};  */

	/* 	const handleCheckLikeStatus = (data) => {
		const isSaved = savedMovies.some(
			(movie) => movie.movieId === data.id
		);

		return isSaved;
	};

	const handleCheckLikeSavedStatus = (data) => {
		const isSaved = savedMovies.some((movie) => movie.movieId === data.movieId);

		return isSaved;
	}; */

	const findToken = () => {
        mainApi.checkToken()
            .then((res) => {
            	if(res) {
                	setIsLoggedIn(true);
            	}
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
	}

	// установка данных о пользователе
	useEffect(() => {
		mainApi
			.getUserInfo()
			.then((res) => {
				setIsLoggedIn(true);
				setCurrentUser(res);
				navigate(pathname);
				setIsLoading(false);
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}, []);

	useEffect(() => {
		findToken();
		// setIsLoading(false);
	}, [])

	// отрисовка сохраненных фильмов с сервера
	useEffect(() => {
		if (isLoggedIn) {
			mainApi.getSavedMovies().then((res) => {
				setSavedMovies(res);
			});
		}
	}, [isLoggedIn]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}/>}>
						<Route
							path="/"
							element={
								<BasicLayout
									onNavOpen={handleNavClick}
									isLoggedIn={isLoggedIn}
									isLoading={isLoading}
								></BasicLayout>
							}
						>
							<Route
								path="movies"
								element={
									<Movies
										isLoading={isLoading}
										onSave={handleSaveMovie}
										savedMovies={savedMovies}
										movies={filteredMovies}
										onFindMovies={findMovies}
										notFound={notFound}
										onDelete={handleDeleteMovie}
									></Movies>
								}
							/>
							<Route
								path="saved-movies"
								element={
									<SavedMovies
										onDelete={handleDeleteMovie}
										movies={savedMovies}
										onFindSavedMovies={findSavedMovies}
									></SavedMovies>
								}
							/>
							<Route
								path="profile"
								element={<Profile onSignOut={handleSignOut} />}
							></Route>
						</Route>
					</Route>

					<Route
						path="/"
						element={
							<BasicLayout onNavOpen={handleNavClick} isLoggedIn={isLoggedIn} />
						}
					>
						<Route index element={<Main />} />
					</Route>

					<Route path="/" element={<AuthLayout />}>
						<Route
							path="signup"
							element={
								<Register
									isRegistered={isRegistered}
									onRegister={handleRegister}
								></Register>
							}
						/>
						<Route
							path="signin"
							element={<Login onLogin={handleLogin} isLoogedIn={isLoggedIn} />}
						/>
					</Route>

					<Route path="*" element={<NotFoundPage />}></Route>
				</Routes>

				<Navigation isOpen={isNavOpen} onClose={closeNav}></Navigation>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
