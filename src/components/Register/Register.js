// компонент страницы регистрации.
import { Link } from "react-router-dom";

function Register() {
	return (
		<div className="auth">
			<Link to ='/' className="auth__logo logo"></Link>
			<h2 className="auth__title">Добро пожаловать!</h2>
			<form className="auth__form" name="signup">
				<label className="auth__input-label">Имя</label>
				<input
					className="auth__input"
					id="name-input"
					type="text"
					name="name"
					placeholder="Имя"
					/* value={email || ""} */
					autoComplete="off"
					required
					/* onChange={handleEmailChange} */
				/>
				<label className="auth__input-label">E-mail</label>
				<input
					className="auth__input"
					id="email-input"
					type="email"
					name="email"
					placeholder="Email"
					/* value={email || ""} */
					autoComplete="off"
					required
					/* onChange={handleEmailChange} */
				/>
				<span className="auth__input-error"></span>
				<label className="auth__input-label">Пароль</label>
				<input
					className="auth__input"
					id="password-input"
					type="password"
					name="password"
					placeholder="Пароль"
					/* value={password || ""} */
					autoComplete="off"
					required
					/* onChange={handlePasswordChange} */
				/>
				<span className="auth__input-error password-input-error"></span>
				<button
					className="auth__submit-btn auth__submit-btn_type_signup auth__submit-btn_disabled"
					type="submit"
					disabled=""
				>
					Зарегистрироваться
				</button>
			</form>
			<div className="auth__link-container">
				<p className="auth__subtitle">
					Уже зарегистрированы?
					<Link className="auth__link" to="/signin">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
