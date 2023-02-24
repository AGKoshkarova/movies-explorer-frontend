import { useState } from "react";

import { useLocation } from "react-router-dom";

import { NAME_PATTERN, EMAIL_PATTERN } from "./constants";

import { omit } from "lodash";

//хук управления формой и валидации формы
export const useFormWithValidation = (callback) => {
	const location = useLocation();
	const pathname = location.pathname;

	const [values, setValues] = useState({});

	const [errors, setErrors] = useState({});

	const [isValid, setIsValid] = useState(false);

	const isOnRegister =
		pathname === "/signup" && Object.keys(values).length === 3;
	const isOnLogin = pathname === "/signin" && Object.keys(values).length === 2;

	const handleChange = (evt) => {
		evt.preventDefault();

		const name = evt.target.name;
		const value = evt.target.value;

		validate(evt, name, value);

		setValues({ ...values, [name]: value });

		if (
			Object.keys(errors).length === 0 &&
			(isOnRegister || isOnLogin)
		) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

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

			case "password":
				if (value.length < 2) {
					setErrors({
						...errors,
						password: "Пароль должен содержать не менее 2 симоволов",
					});
				} else {
					let newObj = omit(errors, "password");
					setErrors(newObj);
				}
				return;

			default:
				return;
		}
	};

	const handleSubmit = (evt) => {
		if (evt) evt.preventDefault();

		if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
			callback();
			setIsValid(true);
		} else {
			alert("Ошибка в заполнении формы!");
			setIsValid(false);
		}
	};

	return { values, handleChange, errors, handleSubmit, isValid };
};
