import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

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

function App() {
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
	const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

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
				console.log(err);
			});
	};

	// логин
	const handleLogin = ({ email, password }) => {
		mainApi
			.login(email, password)
			.then((res) => {
				setIsLoggedIn(true);
				setCurrentUser(res);
				navigate("/movies");
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// выход изз аккаунта
	const handleSignOut = () => {
		mainApi
			.logout()
			.then(() => {
				localStorage.clear();
				navigate("/");
				setIsLoggedIn(false);
				setFilteredMovies([])
			})
			.catch((err) => {
				console.log(err);
			})
	};

	// редактирование данных о пользователе
	function handleUpdateUser(data) {
		mainApi
			.changeUserInfo(data)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	}

	// функции открытия/закрытия панели навигации
	const handleNavClick = () => {
		setIsNavOpen(!isNavOpen);
	};

	const closeNav = () => {
		setIsNavOpen(false);
	};

	// фильтрация фильмов
	const filterMovies = (movies, searchTerm) => {
		return movies
			.map((movie) => {
				let searchedMovies = [];
	
				for (const [key, value] of Object.entries(movie)) {
					if (
						key === "nameRU" ||
						key === "nameEN" ||
						key === "director" ||
						key === "country" ||
						key === "description" ||
						key === "year"
					) {
						searchedMovies.push(value.toLowerCase().includes(searchTerm.toLowerCase()));
					}
				}
	
				return searchedMovies.includes(true) ? movie : null;
			})
			.filter((element) => element !== null);
	};

	// поиск по фильмам
	const handleFindMovies = (searchTerm) => {
		if (foundMovies.length === 0) {
			moviesApi
				.getMovies()
				.then((res) => {
					setAreMoviesLoading(true);
					setFoundMovies(res);
					const movies = filterMovies(res, searchTerm);
					if (movies.length === 0) {
						setNotFound(true);
					} else {
						setFilteredMovies(movies);
						setNotFound(false);
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setAreMoviesLoading(false);
				})
		} else {
			const movies = filterMovies(foundMovies, searchTerm);
			if (movies.length === 0) {
				setNotFound(true);
			} else {
				setFilteredMovies(movies);
				setNotFound(false);
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
		const result = filterMovies(savedMovies, searchTerm.movie);
		if (result.length === 0) {
			setFilteredSavedMovies([]);
		} else {
			setFilteredSavedMovies(result);
		}
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
										filteredSavedMovies={filteredSavedMovies}
									></SavedMovies>
								}
							/>
							<Route
								path="profile"
								element={
									<Profile
										onSignOut={handleSignOut}
										onEditProfile={handleUpdateUser}
									/>
								}
							></Route>
						</Route>
					</Route>

					<Route
						path="/"
						element={
							<BasicLayout onNavOpen={handleNavClick} isLoggedIn={isLoggedIn} />
						}
					>
						<Route index element={<Main isLoggedIn={isLoggedIn} />} />
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
