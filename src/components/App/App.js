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

import { mainApi } from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { moviesApi } from "../../utils/MoviesApi";

import { useLocalStorage } from "../../utils/useLocalStorage";

function App() {
	// стейт юзера
	const [currentUser, setCurrentUser] = useState({});

	// состояния открытия навигационного меню
	const [isNavOpen, setIsNavOpen] = useState(false);

	// состояние регитсрации
	const [isRegistered, setIsRegistered] = useState(false);

	// состояние логина
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// сохраненные фильмы
	const [savedMovies, setSavedMovies] = useState([]);

	// ранее найденные фильмы отображаемые при первой загрузке страницы
	// const [foundMovies, setFoundMovies] = useLocalStorage('movies', []);

	//объект истории
	const navigate = useNavigate();

	//функция регистрации
	const handleRegister = ({ name, email, password }) => {
		mainApi
			.register(name, email, password)
			.then((res) => {
				setIsRegistered(true);
				setIsLoggedIn(false);
				navigate("/signin");
				console.log(res);
			})
			.catch((err) => {
				/* setIsInfoToolTipOpen(true); */
				console.log(err);
			});
	};

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
				//setIsInfoToolTipOpen(true);
				console.log(err);
			});
	};

	const handleNavClick = () => {
		setIsNavOpen(!isNavOpen);
	};

	const closeNav = () => {
		setIsNavOpen(false);
	};

	const handleMovieLike = (data) => {
		const isSaved = data.movie.owner ? true : false;

		mainApi
			.changeSavedStatus(data.movie, !isSaved)
			.then((newMovie) => {
				setSavedMovies((state) =>
					state.map((movie) => (movie.id === data.movie.id ? newMovie : movie))
				);
				console.log(newMovie);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteMovie = (data) => {
		const isSaved = data.movie.owner === currentUser._id;

		mainApi
			.deleteMovie(data.movie._id, isSaved)
			.then(() => {
				setSavedMovies((movies) =>
					movies.filter((movie) => movie._id !== data.movie._id)
				);
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	};

	// проверка наличия токена
	const findToken = () => {
		mainApi
			.checkToken()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true);
					navigate("/movies");
				}
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	};

	// установка данных о пользователе
	useEffect(() => {
		if (isLoggedIn) {
			mainApi
				.getUserInfo()
				.then((res) => {
					setIsLoggedIn(true);
					setCurrentUser(res);
					// setEmail(res.email);
					// navigate("/movies");
				})
				.catch((err) => console.log(`Ошибка: ${err}`));
		}
	}, [isLoggedIn]);


	//валидация токена
	useEffect(() => {
		findToken();
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route
						path="/"
						element={
							<BasicLayout onNavOpen={handleNavClick} isLoggedIn={isLoggedIn} />
						}
					>
						<Route index element={<Main />}></Route>
						<Route
							path="movies"
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Movies
										onChangeLike={handleMovieLike}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="saved-movies"
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<SavedMovies
										onDelete={handleDeleteMovie}
										savedMovies={savedMovies}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="profile"
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Profile />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path="/" element={<AuthLayout />}>
						<Route
							path="signup"
							element={
								<Register
									isRegistered={isRegistered}
									onRegister={handleRegister}
								/>
							}
						/>
						<Route
							path="signin"
							element={<Login isLoogedIn={isLoggedIn} onLogin={handleLogin} />}
						/>
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>

				<Navigation isOpen={isNavOpen} onClose={closeNav} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
