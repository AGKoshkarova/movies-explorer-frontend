import React from "react";

import myPhoto from "../../images/me.jpg";

import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
	return (
		<section className="about-me" id="about-me">
			<h2 className="title about-me__title">Студент</h2>
			<div className="container about-me__container">
				<div className="about-me__wrapper">
					<div className="about-me__info">
						<h3 className="about-me__name">Анна</h3>
						<p className="about-me__job">
							Веб-разработчик, Junior Project-manager, 23 года
						</p>
						<p className="about-me__description">
							Родилась и живу в Москве. Работаю в крупной холдинговой компании
							Junior project-менеджером. В свободное время занимаюсь спортом,
							перематриваю любимые ситкомы и гуляю. Решила изучать разработку,
							чтобы иметь полезные hard skills для работы. Планирую активно
							развиваться во front-end разработке.
						</p>
						<a
							className="about-me__link-git"
							href="https://github.com/AGKoshkarova?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
						>
							Github
						</a>
					</div>
					<img className="about-me__image" alt="фото" src={myPhoto}></img>
				</div>
				<Portfolio />
			</div>
		</section>
	);
}

export default AboutMe;
