import linkIcon from "../../images/link_icon.svg";

function Portfolio() {
	return (
		<div className="portfolio">
			<h4 className="portfolio__title">Портфолио</h4>
			<ul className="portfolio__list">
				<li className="portfolio__element">
					Статичный сайт
					<a
						className="portfolio__link"
						href="https://agkoshkarova.github.io/how-to-learn/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="portfolio__link-icon"
							alt="Ссылка"
							src={linkIcon}
						></img>
					</a>
				</li>
				<li className="portfolio__element">
					Адаптивный сайт
					<a
						className="portfolio__link"
						href="https://agkoshkarova.github.io/russian-travel/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="portfolio__link-icon"
							alt="Ссылка"
							src={linkIcon}
						></img>
					</a>
				</li>
				<li className="portfolio__element">
					Одностраничное приложение
					<a
						className="portfolio__link"
						href="https://mesto.koshkarova.nomoredomains.club/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="portfolio__link-icon"
							alt="Ссылка"
							src={linkIcon}
						></img>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Portfolio;
