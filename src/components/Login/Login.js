import { Link } from "react-router-dom";

import { useFormWithValidation } from "../../utils/useFormValidation";

function Login(props) {
	const formLogin = () => {
		console.log("Callback function when form is submitted!");
		console.log("Form Values ", values);
		props.onLogin(values);
	};

	const { values, handleChange, errors, handleSubmit, isValid } =
		useFormWithValidation(formLogin);

	const buttonClassName = isValid
		? "auth__submit-btn auth__submit-btn_type_signin"
		: "auth__submit-btn_type_signin_disabled";

	return (
		<div className="auth">
			<Link to="/" className="auth__logo logo"></Link>
			<h2 className="auth__title">Рады видеть!</h2>
			<form className="auth__form" name="signin" onSubmit={handleSubmit}>
				<label className="auth__input-label">E-mail</label>
				<input
					className="auth__input auth__input_invalid"
					id="email-input"
					type="email"
					name="email"
					placeholder="Email"
					value={values.email || ""}
					autoComplete="off"
					required
					onChange={handleChange}
				/>
				{errors.email && (
					<span className="auth__error auth__error_type_email">
						{errors.email}
					</span>
				)}
				<label className="auth__input-label">Пароль</label>
				<input
					className="auth__input auth__input_invalid"
					id="password-input"
					type="password"
					name="password"
					placeholder="Пароль"
					value={values.password || ""}
					autoComplete="off"
					required
					onChange={handleChange}
				/>
				{errors.password && (
					<span className="auth__error auth__error_type_password">
						{errors.password}
					</span>
				)}
				<button
					className={buttonClassName}
					type="submit"
					disabled={isValid ? "" : true}
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
