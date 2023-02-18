// форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

function SearchForm(props) {

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit();
	}

	function handleChange(evt) {
		props.onChange(evt.target.value);
	}

	return (
		<div className="search-form">
			<div className="search-form__container">
				<form
					className="search-form__form"
					name="movies-form"
					onSubmit={handleSubmit}
				>
					<input
						className="search-form__input"
						id="movie-input"
						type="text"
						name="movie"
						placeholder="Фильм"
						value={props.searchTerm || ""}
						autoComplete="off"
						required
						onChange={handleChange}
					></input>
					<button className="search-form__btn" type="submit"></button>
				</form>
			</div>
			<FilterCheckbox />
		</div>
	);
}

export default SearchForm;
