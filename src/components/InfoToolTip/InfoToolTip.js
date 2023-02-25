import React from "react";
import imageOk from "../../images/ok.svg";
import imageError from "../../images/no.svg";

import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

export default function InfoToolTip(props) {
	const location = useLocation();
	const pathname = location.pathname;

	const [isOk, setIsOk] = useState(false);

	const isOnRegister = pathname === "/signup";
	const isOnLogin = pathname === "/signin";
	const isOnProfile = pathname === "/profile";
	const isOnMovies = pathname === "/movies";

	useEffect(() => {
		if (isOnRegister && props.isRegistered) {
			setIsOk(true);
		} else if ((isOnLogin || isOnMovies) && props.isLoggedIn) {
			setIsOk(true);
		} else if (isOnProfile && props.isProfileChanged) {
			setIsOk(true);
		} else {
			setIsOk(false);
		}
	}, [
		isOnLogin,
		isOnRegister,
		isOnProfile,
		isOnMovies,
		props.isLoggedIn,
		props.isRegistered,
		props.isProfileChanged,
	]);

	return (
		<div
			className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}
		>
			<div className="popup__container popup__container_type_info">
				<button
					className="popup__close-btn popup__close-btn_type_profile"
					type="button"
					aria-label="Закрыть"
					onClick={props.onClose}
				/>
				<img
					className="popup__info-image"
					src={`${isOk ? imageOk : imageError}`}
					alt=""
				/>
				<p className="popup__info-subtitle">{`${
					isOk ? "Успешно!" : "Что-то пошло не так! Попробуйте ещё раз."
				}`}</p>
			</div>
		</div>
	);
}
