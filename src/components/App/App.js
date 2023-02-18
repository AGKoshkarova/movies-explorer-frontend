import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState } from "react";

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


function App() {
	// стейт юзера
	const [currentUser, setCurrentUser] = useState({});

	// состояния открытия навигационного меню
	const [isNavOpen, setIsNavOpen] = useState(false);

	// состояние регитсрации
	const [isRegistered, setIsRegistered] = useState(false);

	// состояние логина
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//объект истории
	const navigate = useNavigate();

	//функция регистрации
	const handleRegister = ({ name, email, password }) => {
		mainApi
			.register(name, email, password)
			.then((res) => {
				setIsRegistered(true);
				setIsLoggedIn(false);
				// navigate("/signin");
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
				//setEmail(email);
				navigate("/movies");
				console.log(res);
			})
			.catch((err) => {
				//setIsInfoToolTipOpen(true);
				console.log(err);
			});
	};

	function handleNavClick() {
		setIsNavOpen(!isNavOpen);
	}

	function closeNav() {
		setIsNavOpen(false);
	}

	return (
		<div className="page">
			<Routes>
				<Route path="/" element={<BasicLayout onNavOpen={handleNavClick}/>}>
					<Route index element={<Main />}></Route>
					<Route path="movies" element={<Movies />}></Route>
					<Route path="saved-movies" element={<SavedMovies />}></Route>
					<Route path="profile" element={<Profile />}></Route>
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
						></Route>
						<Route
							path="signin"
							element={<Login isLoogedIn={isLoggedIn} onLogin={handleLogin} />}
						></Route>
						<Route path="*" element={<NotFoundPage />}></Route>
					</Route>
				</Routes>

				<Navigation isOpen={isNavOpen} onClose={closeNav} />
			</div>
	);
}

export default App;
