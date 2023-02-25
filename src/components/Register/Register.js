import { Link } from "react-router-dom";

import { useFormWithValidation } from "../../utils/useFormValidation";

function Register(props) {
	const handleFormRegister = () => {
		console.log("Form Values ", values);
		props.onRegister(values);
	};

	const { values, handleChange, errors, handleSubmit, isValid } =
		useFormWithValidation(handleFormRegister);

	const buttonClassName = isValid
		? "auth__submit-btn auth__submit-btn_type_signup"
		: "auth__submit-btn auth__submit-btn_disabled";

	return (
		<div className="auth">
			<Link to="/" className="auth__logo logo"></Link>
			<h2 className="auth__title">Добро пожаловать!</h2>
			<form
				className="auth__form"
				name="signup"
				onSubmit={handleSubmit}
				noValidate
			>
				<label className="auth__input-label">Имя</label>
				<input
					className="auth__input auth__input_invalid"
					id="user-input"
					type="text"
					name="name"
					placeholder="Имя"
					value={values.name || ""}
					autoComplete="off"
					required
					onChange={handleChange}
				/>
				{errors.name && (
					<span className="auth__error auth__error_type_name">
						{errors.name}
					</span>
				)}
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
