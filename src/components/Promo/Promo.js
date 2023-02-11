// компонент с вёрсткой баннера страницы «О проекте».
import promoLogo from "../../images/pic__COLOR_landing-logo.svg";

function Promo() {
	return (
		<div className="promo">
			<div className="promo__container">
				<h1 className="promo__heading">
					Учебный проект студента факультета Веб&#8209;разработки.
				</h1>
				<img className="promo__logo" src={promoLogo} alt="logo"></img>
			</div>
		</div>
	);
}

export default Promo;
