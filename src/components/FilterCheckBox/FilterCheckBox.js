import React, { useState } from "react";

function FilterCheckbox() {
	const [checked, setChecked] = useState(false);

	function changeCheckbox() {
		setChecked(!checked);
	}

	return (
		<div className="checkbox">
			<input
				className="checkbox__input"
				type="checkbox"
                id="movie-checkbox"
                onChange={changeCheckbox}
                checked={checked}
			></input>
			<label className="checkbox__label" htmlFor="movie-checkbox">
			</label>
            <p className="checkbox__title">Короткометражки</p>
		</div>
	);
}

export default FilterCheckbox;
