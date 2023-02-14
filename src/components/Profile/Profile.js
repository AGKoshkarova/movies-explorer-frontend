// компонент страницы изменения профиля.

function Profile() {
	return (
		<div className="profile">
			<h2 className="profile__title">Привет, Виталий!</h2>
			<form className="profile__form" name="profile">
				<div className="profile__input-container">
					<label className="profile__input-label">Имя</label>
					<input
						className="profile__input profile__input_type_name"
						value="Виталий"
					></input>
				</div>
				<div className="profile__input-container">
					<label className="profile__input-label">E-mail</label>
					<input
						className="profile__input profile__input_type_email"
						value="pochta@yandex.ru"
					></input>
				</div>
				<div className="profile__btn-container">
					<button className="profile__btn profile__btn_type_edit" type="button">
						Редактировать
					</button>
					<button className="profile__btn profile__btn_type_logout" type="button">
						Выйти из аккаунта
					</button>
				</div>
			</form>
		</div>
	);
}

export default Profile;
