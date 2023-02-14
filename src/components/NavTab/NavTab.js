// компонент с навигацией по странице «О проекте».

function NavTab() {
	return (
		<nav className="navtab">
			<div className="navtab__links">
				<a className="navtab__link navtab__link_type_project" href="#about-project">
					О проекте
				</a>
				<a className="navtab__link navtab__link_type_techs" href="#techs">
					Технологии
				</a>
				<a className="navtab__link navtab__link_type_student" href="#about-me">
					Студент
				</a>
			</div>
		</nav>
	);
}

export default NavTab;
