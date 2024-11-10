

import { getMovies, showMovies, clearButtons, showColor, sendAllMovies, setGenre, highlightSelection } from "./helperFunctions.js";
import { searchForm } from "./form.js";

//const API_KEY = '540a620756b8a19728af5bb33efe1072';
const API_KEY = 'api_key=540a620756b8a19728af5bb33efe1072';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
//const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY

const form = document.getElementById("form");
const search = document.getElementById("search");


getMovies(API_URL)

searchForm(form, search, getMovies, highlightSelection, API_URL, searchURL)

setGenre();