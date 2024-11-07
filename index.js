
//import axios from 'axios';

//const API_KEY = '540a620756b8a19728af5bb33efe1072';
const API_KEY = 'api_key=540a620756b8a19728af5bb33efe1072';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY

const genres = [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 80,
            "name": "Crime"
          },
          {
            "id": 99,
            "name": "Documentary"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 14,
            "name": "Fantasy"
          },
          {
            "id": 36,
            "name": "History"
          },
          {
            "id": 27,
            "name": "Horror"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 9648,
            "name": "Mystery"
          },
          {
            "id": 10749,
            "name": "Romance"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          },
          {
            "id": 10770,
            "name": "TV Movie"
          },
          {
            "id": 53,
            "name": "Thriller"
          },
          {
            "id": 10752,
            "name": "War"
          },
          {
            "id": 37,
            "name": "Western"
          }
        ]
    
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");

// Using Axios to fetch data or return a Promise
function getMovies(url) {
    axios.get(url)
        .then(response => {
            console.log(response.data.results); // it logs all the movie data

            if (response.data.results.length !== 0) {
                showMovies(response.data.results);
            }
            else {
                main.innerHTML = `<h1 class = "no-results">No Results Available!</h1>`
            }

            // showMovies(response.data.results); // this displays the movies
        })
        .catch(error => {
            console.error('Error fetching data:', error); // to handle any errors in case
        });
}


function clearButtons() {
    let clearButtons = document.getElementById("clear");
    if (clearButtons) {
        clearButtons.classList.add("highlight")

    }
    else {
    let clear = document.createElement("div");
    clear.classList.add("tag", "highlight");
    clear.id = "clear";
    clear.innerText = "Clear x";
    clear.addEventListener("click", () => {
        selectedgenre = [];
        setGenre();
        getMovies(API_URL)
    })
    tagsEl.append(clear);

}
}




getMovies(API_URL)


 function showMovies(movies) {
    main.innerHTML = "";
    
    for (const movie of movies) {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${poster_path? IMG_URL + poster_path: "https://via.placeholder.com/1080x1580"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">

                <h3>Overview</h3>
               ${overview}
            </div>`

            main.appendChild(movieEl);
    }

    }
    

    function getColor(vote) {
        vote = parseFloat(vote);
        
        if (vote >= 8) {
            return 'green';
        
        } else if (vote >= 5) {
            return 'orange';

        } else {
            return 'red';
        }

    }


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = search.value;

        selectedgenre=[];
        highlightSelection()

        if(searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm) // it is making the GET request
        }
        else {
            getMovies(API_URL);
        }
    })


    var selectedgenre = [];
    setGenre();
    function setGenre() {

        tagsEl.innerHTML = "";
        genres.forEach(genre => {
            const t = document.createElement("div");
            t.classList.add("tag");
            t.id = genre.id;
            t.innerText = genre.name;

            t.addEventListener("click", () => {
                if(selectedgenre.length == 0) {
                    selectedgenre.push(genre.id);
                }
                else {
                    if(selectedgenre.includes(genre.id)) {
                        selectedgenre.forEach((id, index) => {
                            if (id == genre.id) {
                                selectedgenre.splice(index, 1)
                            }
                        })
                    }
                    else {
                        selectedgenre.push(genre.id);
                    }
                }

                console.log(selectedgenre);
                getMovies(API_URL + "&with_genres=" + encodeURI(selectedgenre.join(",")))
                highlightSelection();

            })

            tagsEl.append(t);
        })
    }


    // to know which one was selected earlier
    function highlightSelection() {
        const tags = document.querySelectorAll(".tag");
        tags.forEach(tag => {
            tag.classList.remove("highlight")
        })
        clearButtons()
        if (selectedgenre.length != 0) {
            selectedgenre.forEach(id => {
                const highlightedTag = document.getElementById(id);
                highlightedTag.classList.add("highlight");
            })

        }
        
    }