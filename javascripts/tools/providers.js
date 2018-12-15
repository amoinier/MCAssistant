module.exports = [
    {
        name: `TMDB`,
        url: {
            movies: `https://api.themoviedb.org/3/search/movie?page=1&include_adult=true&`,
            tv: `https://api.themoviedb.org/3/search/tv?page=1&include_adult=true&`
        },
        key: {
            api: `api_key`,
            lang: `language`,
            query: `query`,
            year: `primary_release_year`,
        }
    }
]