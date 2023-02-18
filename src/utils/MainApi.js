class MainApi {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

    _checkResponse() {
        return (res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Код ошибки: ${res.status}.`)
        }
    }      
    
    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            // credentials: "include",
            headers: this._headers,
            body: JSON.stringify({ name, email, password }),
        })
            .then(this._checkResponse())
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            // credentials: "include",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then((res) => this._getResponse(res))
            .then((data) => data);
    }

    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            // credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => this._getResponse(res))
            .then((data) => data);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse())
    }


    // сохраняем фильм на нашем api
    saveMovie(id) {
        return fetch(`${this._url}/saved-movies/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    // удаляем фильм с нашего api
    deleteMovie(id) {
        return fetch(`${this._url}/saved-movies/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse())
    }

    // меняем отображение кнопки лайка 
    changeSavedStatus(id, action) {
        return fetch(`${this._url}/saved-movies/${id}`, {
            method: `${!action ? 'DELETE' : 'POST'}`,
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._checkResponse())
    }
}

export const mainApi = new MainApi({
	url: "http://localhost:3000",
	headers: {
		"Content-type": "Application/json",
	},
});


