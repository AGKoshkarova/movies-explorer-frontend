// компонент, который управляет отрисовкой карточек фильмов на страницу
// и их количеством
import MoviesCard from "../MoviesCard/MoviesCard";
import { Suspense } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
	return (
		<>
			<Suspense fallback={<Preloader/>}>
				<ul className="movies-card-list">
					{props.movies.map((movie) => {
						return (
							<li className="movies-card-list__element" key={movie.index}>
								<MoviesCard
									name={movie.name}
									image={movie.image}
									isLiked={movie.isLiked}
								/>
							</li>
						);
					})}
				</ul>
			</Suspense>
		</>
	);
}

export default MoviesCardList;
