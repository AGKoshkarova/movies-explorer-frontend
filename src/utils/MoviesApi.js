class MoviesApi {
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

    getMovies() {
        return fetch(`${this._url}`, {
            method: 'GET',
            /* credentials: 'include', */
            headers: this._headers
        })
        .then(this._checkResponse())
    }


    // запрос на инфо о фильме с внешнего api => после чего сохраняем фильм уже на нашем api
    saveMovie(id) {
        return fetch(`${this._url}/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse())
    }
};

export const moviesApi = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        'content-type': 'application/json',
    }
});