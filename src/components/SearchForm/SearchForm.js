// форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

function SearchForm() {

	return (
		<div className="search-form">
			<div className="search-form__container">
				<form
					className="search-form__form"
					name="movies-form"
				>
					<input
						className="search-form__input"
						id="movie-input"
						type="text"
						name="movie"
						placeholder="Фильм"
						/* value={movie || ""} */
						autoComplete="off"
						required
					></input>
					<button className="search-form__btn" type="submit"></button>
				</form>
			</div>
			<FilterCheckbox />
		</div>
	);
}

export default SearchForm;
