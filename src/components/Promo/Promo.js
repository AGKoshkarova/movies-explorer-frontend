import promoLogo from "../../images/pic__COLOR_landing-logo.svg";

function Promo(props) {
	const modifier = `${props.isLoggedIn ? "loggedIn" : ""}`;

	return (
		<div className="promo">
			<div className="promo__container">
				<h1 className="promo__heading">
					Учебный проект студента факультета Веб&#8209;разработки.
				</h1>
				<img
					className={`promo__logo promo__logo_type_${modifier}`}
					src={promoLogo}
					alt="logo"
				></img>
			</div>
		</div>
	);
}

export default Promo;
