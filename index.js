// TMDB 

const API_KEY = 'api_key=540a620756b8a19728af5bb33efe1072';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;




function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        //console.log(data);
        showMovies(data.results);
    })
}

getMovies(API_URL)


 function showMovies(data) {
    data.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl

    })

 }