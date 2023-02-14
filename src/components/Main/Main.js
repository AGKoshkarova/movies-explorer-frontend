// компонент страницы «О проекте».
// Он будет содержать только презентационные компоненты
// и в будущем, за исключением шапки навигации.

// Вот так выглядит список компонентов, которые будут использоваться только на этой странице:

// Promo — компонент с вёрсткой баннера страницы «О проекте».
// NavTab — компонент с навигацией по странице «О проекте».
// AboutProject — компонент с описанием дипломного проекта.
// Techs — компонент с использованными технологиями.
// AboutMe — компонент с информацией о студенте.
// Portfolio — компонент со ссылками на другие проекты.

import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";

import { Routes, Route, Link } from "react-router-dom";

function Main() {
	return (
		<main className="main">
			<Promo />
			<NavTab />
			<AboutProject />
			<Techs />
			<AboutMe />
		</main>
	);
}

export default Main;
