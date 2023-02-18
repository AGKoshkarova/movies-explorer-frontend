import { useState, useCallback } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {

	const [values, setValues] = useState({});

	const [errors, setErrors] = useState({});

	const [isValid, setIsValid] = useState(false);

	const handleChange = (evt) => {
		evt.preventDefault();

		const name = evt.target.name;
		const value = evt.target.value;

		setValues({ ...values, [name]: value });

		setErrors({ ...errors, [name]: evt.target.validationMessage });

		setIsValid(evt.target.closest("form").checkValidity());
	};

	const validation = (values) => {

		const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
		const userPattern = /^[a-zА-яё\-\s]{2,30}$/;

		if (!emailPattern.test(values.email)) {
			errors.email = "Введите корректный e-mail";
		} else if (!userPattern.test(values.name)) {
			errors.name = "Введите корректное имя";
		}

		return errors;
	}

	const resetForm = useCallback(
		(newValues = {}, newErrors = {}, newIsValid = false) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[setValues, setErrors, setIsValid]
	);

	return { values, handleChange, errors, isValid, resetForm };
}
