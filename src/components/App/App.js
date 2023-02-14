import { Routes, Route } from "react-router-dom";
import React, {useState} from "react";

import Main from "../Main/Main";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Login from "../Login/Login";
import Register from "../Register/Register";

import { BasicLayout, AuthLayout } from "../Layout/Layout";

import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

// custom hook to get the current pathname in React

function App() {

	const [isNavOpen, setIsNavOpen] = useState(false);

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
					<Route path="signup" element={<Register />}></Route>
					<Route path="signin" element={<Login />}></Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Route>
			</Routes>

			<Navigation isOpen={isNavOpen} onClose={closeNav} />
		</div>
	);
}

export default App;
