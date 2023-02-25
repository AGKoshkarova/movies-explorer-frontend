import { Link, NavLink, useLocation } from "react-router-dom";

import profileIcon from "../../images/profile_icon.svg";

function Header(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const isOnMain = pathname === "/";

	const modifier = `${props.isLoggedIn ? "movies" : "main"}`;

	const loggedInModifier = `${
		props.isLoggedIn && isOnMain ? "main-loggedIn" : modifier
	}`;

	const isActive = ({ isActive }) =>
		isActive ? "header__nav-link header__nav-link_active" : "header__nav-link";

	const handleNavigation = () => {
		props.onNavigation(props);
	};

	return (
		<header className={`header header_type_${loggedInModifier}`}>
			<div className={`header__container header__container_type_${modifier}`}>
				<Link to="/" className="header__logo logo"></Link>
				<button
					className={`header__nav-btn header__nav-btn_type_${loggedInModifier}`}
					type="button"
					onClick={handleNavigation}
				></button>

				{props.isLoggedIn ? (
					<nav className="header__nav">
						<NavLink to="/movies" className={isActive}>
							Фильмы
						</NavLink>
						<NavLink to="/saved-movies" className={isActive}>
							Сохранённые фильмы
						</NavLink>
					</nav>
				) : (
					<div className="header__links header__links_type_main">
						<Link
							to="/signup"
							className="header__link header__link_type_signup"
						>
							Регистрация
						</Link>
						<Link
							to="/signin"
							className="header__link header__link_type_signin"
						>
							Вход
						</Link>
					</div>
				)}

				{props.isLoggedIn ? (
					<div className="header__profile-container">
						<Link
							to="/profile"
							className="header__link header__link_type_profile"
						>
							Аккаунт
						</Link>
						<img
							className={`header__profile-icon header__profile-icon_type_${loggedInModifier}`}
							src={profileIcon}
							alt="Иконка"
						></img>
					</div>
				) : null}
			</div>
		</header>
	);
}

export default Header;
