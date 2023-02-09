
const key = 'c9d6457c6e76f388de64b45f83e456ad';
const base_url = "https://api.themoviedb.org/3"

const requests = {
    requestPopular: `${base_url}/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `${base_url}/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `${base_url}/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestHorror: `${base_url}/search/movie?api_key=${key}&language=en-US&query=horror&page=1`,
    requestUpcoming: `${base_url}/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    genreList: `${base_url}/genre/movie/list?api_key=${key}&language=en-US&page=1`,
}

export default requests;
