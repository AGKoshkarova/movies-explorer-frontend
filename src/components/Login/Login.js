// компонент страницы авторизации.
import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="auth">
			<Link to ='/' className="auth__logo logo"></Link>
			<h2 className="auth__title">Рады видеть!</h2>
			<form className="auth__form" name="signin">
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
					className="auth__submit-btn auth__submit-btn_type_signin auth__submit-btn_disabled"
					type="submit"
					disabled=""
				>
					Войти
				</button>
			</form>
			<div className="auth__link-container">
				<p className="auth__subtitle">
					Ещё не зарегистрированы?
					<Link className="auth__link" to="/signup">
						Регистрация
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
