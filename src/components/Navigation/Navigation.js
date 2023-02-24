import { NavLink, Link } from "react-router-dom";

import profileIcon from "../../images/profile_icon.svg";

function Navigation(props) {
	const isActive = ({ isActive }) =>
		isActive ? "nav__link nav__link_active" : "nav__link";

	return (
		<nav className={`nav ${props.isOpen ? "nav_opened" : ""}`}>
			<button
				className="nav__close-btn"
				type="button"
				aria-label="Закрыть"
				onClick={props.onClose}
			/>
			<ul className="nav__list">
				<li className="nav__element">
					<NavLink className={isActive} to="/">
						Главная
					</NavLink>
				</li>
				<li className="nav__element">
					<NavLink className={isActive} to="/movies">
						Фильмы
					</NavLink>
				</li>
				<li className="nav__element">
					<NavLink className={isActive} to="/saved-movies">
						Сохранённые фильмы
					</NavLink>
				</li>
			</ul>
			<div className="nav__profile-container">
				<Link to="/profile" className="nav__profile-link">
					Аккаунт
				</Link>
				<img className="nav__profile-icon" src={profileIcon} alt="Иконка"></img>
			</div>
		</nav>
	);
}

export default Navigation;
