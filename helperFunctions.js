
//const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const API_KEY = 'api_key=540a620756b8a19728af5bb33efe1072';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");




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


// Using Axios to fetch data or return a Promise
function getMovies(url) {
    return axios.get(url)
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







    function clearButtons() {
        let clearButtons = document.getElementById("clear");
        if (clearButtons) {
            clearButtons.classList.add("highlight")
    
        }
        else { // create the button if it is not there
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




    

     var selectedgenre = [];
     var allMovies = [];

    // setGenre();
    
    function setGenre() {

        tagsEl.innerHTML = "";
        genres.forEach(genre => {
            const obj = document.createElement("div");
            obj.classList.add("tag");
            obj.id = genre.id;
            obj.innerText = genre.name;

            obj.addEventListener("click", () => {
              
              if (selectedgenre.includes(genre.id)) {
                  selectedgenre = selectedgenre.filter(id => id !== genre.id);  // this removes the genre if it is already selected
              } else {
                  selectedgenre.push(genre.id);  // adding genre to the array
              }
  
              console.log("Selected Genres:", selectedgenre);
  

                allMovies = [];

                getMovies(API_URL + "&with_genres=" + encodeURI(selectedgenre.join(",")))
                  .then(movies => {
                    allMovies = movies; // this populates the movies after fetching
                    console.log("Fetched Movies:", allMovies);
                    
                
                // this is sending all the movies of that selected genre to the server
                //if (allMovies.length != 0) {
                if (allMovies !=0 ) {
                  sendAllMovies(allMovies, 'POST');
                  console.log ("all movies sent.")
                  console.log(allMovies);
                }
              })
              
               

                highlightSelection();

            })

            tagsEl.append(obj);
        })
    }


    

// this function is intending to send all the movies of the selected genres to the server
// still having problems to add movies to the list directory I have taken from the movie api documentation

function sendAllMovies(movies, method) {

    const data = { movies }; // this is sending all the list of movies 
  
    const options = {
      method: method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDBhNjIwNzU2YjhhMTk3MjhhZjViYjMzZWZlMTA3MiIsIm5iZiI6MTczMTE2MzA0Mi4xNzI5MjUsInN1YiI6IjY3MmFkNWU4MjZiNjA1YmMxOWU1OTdkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.COY0AuS5sHUa9kgcvcf4MQ1yVmQRIeuFqcmrR7PxRnk'
      },
      body: JSON.stringify(data)
    };
  
    const listId = 12345; 
    
    fetch(`https://api.themoviedb.org/3/list/{list_id}/add_item`, options)
     
  
  
    .then(response => response.json())
    .then(data => {
      console.log('Movies of the selected genres are added successfully', data);
      //console.log(allMovies); //
      console.log("Movies sent:", movies);
    })
  
    .catch((error) => {
      console.error('There is some error adding the movies:', error); 
    })
  
  }
  



  

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const searchTerm = search.value;

//     selectedgenre=[];
//     highlightSelection()

//     if(searchTerm) {
//         getMovies(searchURL + '&query=' + searchTerm) // it is making the GET request
//     }
//     else {
//         getMovies(API_URL);
//     }
// })








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
  
  
  



export { getMovies, showMovies, getColor, clearButtons, setGenre, sendAllMovies, highlightSelection }