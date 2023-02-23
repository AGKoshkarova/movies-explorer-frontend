import React, { useState } from "react";

function FilterCheckbox(props) {

	return (
		<div className="checkbox">
			<input
				className="checkbox__input"
				type="checkbox"
                id={props.id}
                onChange={evt => {props.setCheckedCheckBox(evt.target.checked)}}
                checked={props.checkedCheckBox}
			></input>
			<label className="checkbox__label" htmlFor="movie-checkbox">
			</label>
            <p className="checkbox__title">Короткометражки</p>
		</div>
	);
}

export default FilterCheckbox;
