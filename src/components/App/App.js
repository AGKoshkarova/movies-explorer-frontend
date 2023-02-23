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
import Preloader from "../Preloader/Preloader";

import { mainApi } from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { useLocalStorage } from "../../utils/useLocalStorage";
import { moviesApi } from "../../utils/MoviesApi";

import { findMovies } from "../../utils/findMovies";

function App() {
	// текущее расположение
	// const { pathname } = useLocation();

	// стейт юзера
	const [currentUser, setCurrentUser] = useState({});

	// состояния открытия навигационного меню
	const [isNavOpen, setIsNavOpen] = useState(false);

	// состояние регитсрации
	const [isRegistered, setIsRegistered] = useState(false);

	// состояние логина
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
	// состояние загрузки прелодера
	const [isLoading, setIsLoading] = useState(true);

	// состояние загрузки прелодера во время запроса к серверу с фильмами
	const [areMoviesLoading, setAreMoviesLoading] = useState(false);

	//объект истории
	const navigate = useNavigate();

	//функция регистрации
	const handleRegister = ({ name, email, password }) => {
		mainApi
			.register(name, email, password)
			.then((res) => {
				if (res) {
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
				navigate("/");
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
				setAreMoviesLoading(true);
				setFoundMovies(res);
				// setIsLoading(true);
			})
			.catch((err) => {
				console.log(err);
				// setIsLoading(false);
			})
			.finally(() => {
				setAreMoviesLoading(false);
			});
	};

	// console.log(foundMovies);

	// поиск по фильмам в зависимости от наличия данных в хранлилище
	const handleFindMovies = (searchTerm) => {
		if (foundMovies.length === 0) {
			const initialMovies = getAllMovies();
			const movies = findMovies(initialMovies, searchTerm.movie);
			if (movies.length === 0) {
				setNotFound(true);
			} else {
				setFilteredMovies(movies);
			}
		} else {
			const movies = findMovies(foundMovies, searchTerm.movie);
			if (movies.length === 0) {
				setNotFound(true);
			} else {
				setFilteredMovies(movies);
			}
		}
	};

	// сохранение фильма
	const handleSaveMovie = (data) => {
		console.log(data);

		mainApi
			.saveMovie(data.movie)

			.then((res) => {
				console.log("res:", res);
				setSavedMovies((movies) => [...movies, res.newMovie]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// удаление фильма на api
	const handleDeleteMovie = (data) => {
		console.log(data);

		mainApi
			.deleteMovie(data._id)
			.then((res) => {
				console.log("response", res);
				setSavedMovies((movies) =>
					movies.filter((movie) => movie.movieId !== res.movieId)
				);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	};

	// поиск по сохраненным фильмам
	const findSavedMovies = (searchTerm) => {
		setFilteredSavedMovies(findMovies(foundMovies, searchTerm.movie));
	};

	// функция проверки токена
	const findToken = useCallback(() => {
		mainApi
			.checkToken()
			.then((response) => {
				if (response) {
					setCurrentUser(response);
					setIsLoggedIn(true);
				}
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
			.finally(() => setIsLoading(false));
	}, []);

	// установка данных о пользователе
	useEffect(() => {
		mainApi
			.getUserInfo()
			.then((res) => {
				setIsLoggedIn(true);
				setCurrentUser(res);
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}, []);

	useEffect(() => {
		findToken();
	}, [isLoggedIn]);

	// отрисовка сохраненных фильмов с сервера
	useEffect(() => {
		console.log("currentUser._id:", currentUser._id);

		if (isLoggedIn) {
			mainApi.getSavedMovies().then((movies) => {
				setSavedMovies(
					movies.filter((movie) => movie.owner === currentUser._id)
				);
			});
		}
	}, [isLoggedIn, currentUser._id]);

	// работа прелодера в зависимости от загружающихся данных
	if (isLoading) {
		return <Preloader isOpen={true} />; // редирект
	}

	if (areMoviesLoading) {
		return <Preloader isOpen={true} />; // запрос к серверу с фильмами
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
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
										onFindMovies={handleFindMovies}
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
										savedMovies={savedMovies}
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
