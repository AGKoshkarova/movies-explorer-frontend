import { useState, useEffect, useCallback } from "react";
import {
	SCREEN_SMALL,
	SCREEN_SMALL_M,
	SCREEN_MIDDLE,
	SCREEN_LARGE,
	SCREEN_XLARGE,
} from "./constants";

export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth);

	const handleResize = () => setWidth(window.innerWidth);

	// console.log(width);

	const handleTimeout = () => setTimeout(handleResize, 3000);

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleTimeout);
		handleResize();
		window.removeEventListener("resize", handleTimeout);
	});

	return {
		width,
		isScreenS: SCREEN_SMALL <= width <= SCREEN_SMALL_M,
		isScreenM: width >= SCREEN_MIDDLE,
		isScreenL: width >= SCREEN_LARGE,
		isScreenXL: width >= SCREEN_XLARGE,
	};
};
