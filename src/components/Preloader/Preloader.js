import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
	const preloaderClassName = `preloader ${
		props.isOpen ? "preloader_active" : ""
	}`;

	return (
		<div className={preloaderClassName}>
			<div className="preloader__container">
				<span className="preloader__round"></span>
			</div>
		</div>
	);
};

export default Preloader;
