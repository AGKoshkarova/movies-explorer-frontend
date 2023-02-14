// презентационный компонент, который отрисовывает подвал.
// понадобятся на каждой из основных страниц
import { useLocation } from "react-router-dom";

function Footer() {
	const location = useLocation();
	const pathname = location.pathname;

	const isProfile = pathname === "/profile";

	return (
		<footer className={`footer ${isProfile ? "footer_disabled" : ""}`}>
			<div className="container footer__container">
				<p className="footer__text">
					Учебный проект Яндекс.Практикум х BeatFilm.
				</p>
			</div>
			<div className="container footer__links-container">
				<p className="footer__copyright">&copy; 2023</p>
				<ul className="footer__links">
					<li className="footer__element">
						<a className="footer__link" href="https://practicum.yandex.ru/">
							Яндекс.Практикум
						</a>
					</li>
					<li className="footer__element">
						<a className="footer__link" href="https://github.com/">
							Github
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
