class MainApi {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_checkResponse() {
		return (res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Код ошибки: ${res.status}.`);
		};
	}

	register(name, email, password) {
		return fetch(`${this._url}/signup`, {
			method: "POST",
			credentials: "include",
			headers: this._headers,
			body: JSON.stringify({ name, email, password }),
		}).then(this._checkResponse());
	}

	login(email, password) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			credentials: "include",
			headers: this._headers,
			body: JSON.stringify({ email, password }),
		}).then(this._checkResponse());
	}

	logout() {
		return fetch(`${this._url}/signout`, {
			method: "GET",
			credentials: "include",
			headers: this._headers,
		}).then(this._checkResponse());
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			credentials: "include",
			headers: this._headers,
		}).then(this._checkResponse());
	}

	saveMovie(data) {
		return fetch(`${this._url}/movies`, {
			method: "POST",
			credentials: "include",
			headers: this._headers,
			body: JSON.stringify({
				country: data.country,
				director: data.director,
				duration: data.duration,
				year: data.year,
				description: data.description,
				image: `https://api.nomoreparties.co/${data.image.url}`,
				trailerLink: data.trailerLink,
				thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
				movieId: data.id,
				nameRU: data.nameRU,
				nameEN: data.nameEN,
			}),
		}).then(this._checkResponse());
	}

	// сохраняем фильм на нашем api
	changeUserInfo(data) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			credentials: "include",
			headers: this._headers,
			body: JSON.stringify(data),
		}).then(this._checkResponse());
	}

	// удаляем фильм с нашего api
	deleteMovie(id) {
		return fetch(`${this._url}/movies/${id}`, {
			method: "DELETE",
			credentials: "include",
			headers: this._headers,
		}).then(this._checkResponse());
	}

	// отрисовываем сохраненные на нашем апи фильмы
	getSavedMovies() {
		return fetch(`${this._url}/movies`, {
			method: "GET",
			credentials: "include",
			headers: this._headers,
		}).then(this._checkResponse());
	}

	checkToken() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			credentials: "include",
			headers: this._headers,
		}).then(this._checkResponse());
	}
}

export const mainApi = new MainApi({
	url: "https://api.diploma.koshkarova.nomoredomains.rocks",
	headers: {
		"content-type": "application/json",
	},
});
