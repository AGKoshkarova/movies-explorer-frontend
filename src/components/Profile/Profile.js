// компонент страницы изменения профиля.
import { useContext, useEffect } from "react";
import { useFormWithValidation } from "../../utils/useFormValidation";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
	const currentUser = useContext(CurrentUserContext);

	// const [name, setName] = React.useState("");
	// const [description, setDescription] = React.useState("");

	const { validation, values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onEditProfile(values);
	}

	const handleSignOut = () => {
		props.onSignOut(props)
	}

	return (
		<div className="profile">
			<h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
			<form className="profile__form" name="profile" onSubmit={handleSubmit}>
				<div className="profile__input-container">
					<label className="profile__input-label">Имя</label>
					<input
						className="profile__input profile__input_type_name"
						value={values.name || "" || currentUser.name}
						onChange={handleChange}
						id="name-input"
						type="text"
						name="name"
						placeholder="Имя"
					></input>
				</div>
				<div className="profile__input-container">
					<label className="profile__input-label">E-mail</label>
					<input
						className="profile__input profile__input_type_email"
						value={values.email || "" || currentUser.email}
						onChange={handleChange}
						id="email-input"
						type="email"
						name="email"
						placeholder="E-mail"
					></input>
				</div>
				<div className="profile__btn-container">
					<button
						className="profile__btn profile__btn_type_edit"
						type="button"
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
