// компонент с описанием дипломного проекта

function AboutProject() {
	return (
		<section className="about-project" id="about-project">
			<h2 className="title about-project__title">О проекте</h2>
			<div className="container about-project__container">
				<div className="about-project__text-container">
					<div className="about-project__text-wrapper">
						<h3 className="about-project__subtitle">
							Дипломный проект включал 5 этапов
						</h3>
						<p className=" about-project__text about-project__text_backend">
							Составление плана, работу над бэкендом, вёрстку, добавление
							функциональности и финальные доработки.
						</p>
					</div>
					<div className="about-project__text-wrapper">
						<h3 className="about-project__subtitle">
							На выполнение диплома ушло 5 недель
						</h3>
						<p className="about-project__text about-project__text_frontend">
							У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
							соблюдать, чтобы успешно защититься.
						</p>
					</div>
				</div>
				<div className="about-project__weeks">
					<p className="about-project__week about-project__week_one">
						1 неделя
					</p>
					<p className="about-project__week about-project__week_four">
						4 недели
					</p>
				</div>
				<div className="about-project__weeks-subtitles">
					<p className="about-project__weeks-subtitle about-project__weeks-subtitle_back">
						Back-end
					</p>
					<p className="about-project__weeks-subtitle about-project__weeks-subtitle_front">
						Front-end
					</p>
				</div>
			</div>
		</section>
	);
}

export default AboutProject;
