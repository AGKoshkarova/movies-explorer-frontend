// форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";
import { useFormWithValidation } from "../../utils/useFormValidation";

import { useLocalStorage } from "../../utils/useLocalStorage";

function SearchForm(props) {
	// const [search, setSearch] = useLocalStorage('search', values);

	const { validation, values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation();

	// const [search, setSearch] = useLocalStorage("search", values);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		props.onSubmit(values);
	};

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
						value={values.movie || ""}
						autoComplete="off"
						required
						onChange={handleChange}
					></input>
					<button
						className="search-form__btn"
						type="submit"
						disabled={isValid ? "" : true}
					></button>
				</form>
			</div>
			<FilterCheckbox
				id="movies"
				checkedCheckBox={props.checkedCheckBox}
				setCheckedCheckBox={props.setCheckedCheckBox}
			/>
		</div>
	);
}

export default SearchForm;
