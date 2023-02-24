// компонент страницы изменения профиля.
import { useContext, useState } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { NAME_PATTERN, EMAIL_PATTERN } from "../../utils/constants";

import { omit } from "lodash";

function Profile(props) {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState(currentUser.name);
	const [email, setEmail] = useState(currentUser.email);
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	function handleSubmit(evt) {
		evt.preventDefault();
		const userData = {
			name,
			email,
		};
		props.onEditProfile(userData);
	}

	const handleNameChange = (evt) => {
		const name = evt.target.name;
		const value = evt.target.value;

		setName(evt.target.value);
		validate(evt, name, value);
		if (Object.keys(errors).length === 0) {
			setIsValid(true);
		}
	};

	const handleEmailChange = (evt) => {
		const name = evt.target.name;
		const value = evt.target.value;

		setEmail(evt.target.value);
		validate(evt, name, value);

		if (Object.keys(errors).length === 0) {
			setIsValid(true);
		}
	};

	const handleSignOut = () => {
		props.onSignOut(props);
	};

	const buttonClassName = isValid
		? "profile__btn profile__btn_type_edit"
		: "profile__btn profile__btn_disabled";

	const validate = (evt, name, value) => {
		switch (name) {
			case "name":
				if (!NAME_PATTERN.test(value)) {
					setErrors({
						...errors,
						name: "Имя может содержать только латиницу, кириллицу, пробел или дефис",
					});
				} else {
					let newObj = omit(errors, "name");
					setErrors(newObj);
				}
				return;

			case "email":
				if (!EMAIL_PATTERN.test(value)) {
					setErrors({
						...errors,
						email: "Введите корректный e-mail адрес",
					});
				} else {
					let newObj = omit(errors, "email");
					setErrors(newObj);
				}
				return;

			default:
				return;
		}
	};

	return (
		<div className="profile">
			<h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
			<form className="profile__form" name="profile" onSubmit={handleSubmit}>
				<div className="profile__input-container">
					<label className="profile__input-label">Имя</label>
					<input
						className="profile__input profile__input_type_name"
						value={name || ""}
						onChange={handleNameChange}
						id="name-input"
						type="text"
						name="name"
						required
						placeholder="Имя"
					></input>
				</div>
				{errors.name && (
					<span className="profile__error profile__error_type_name">
						{errors.name}
					</span>
				)}
				<div className="profile__input-container">
					<label className="profile__input-label">E-mail</label>
					<input
						className="profile__input profile__input_type_email"
						value={email || ""}
						onChange={handleEmailChange}
						required
						id="email-input"
						type="email"
						name="email"
						placeholder="E-mail"
					></input>
				</div>
				{errors.email && (
					<span className="profile__error profile__error_type_email">
						{errors.email}
					</span>
				)}
				<div className="profile__btn-container">
					<button
						className={buttonClassName}
						type="submit"
						disabled={isValid ? "" : true}
					>
						Редактировать
					</button>
					<button
						className="profile__btn profile__btn_type_logout"
						type="button"
						onClick={handleSignOut}
					>
						Выйти из аккаунта
					</button>
				</div>
			</form>
		</div>
	);
}

export default Profile;
