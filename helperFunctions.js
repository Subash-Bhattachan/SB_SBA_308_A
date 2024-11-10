
import genres from './genres.js';

const API_KEY = 'api_key=540a620756b8a19728af5bb33efe1072';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const main = document.getElementById("main");
const tagsEl = document.getElementById("tags");


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

        })
        .catch(error => {
            console.error('Error fetching data:', error); // to handle any errors in case
        });
}


// this function display movies in different containers
function showMovies(movies) {
    main.innerHTML = "";
    
    try {
    // this loops through each movie and display
    for (const movie of movies) {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div"); // this creates a container for each movie
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${poster_path? IMG_URL + poster_path: "https://via.placeholder.com/1080x1580"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${showColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">

                <h3>Overview</h3>
               ${overview}
            </div>`

            main.appendChild(movieEl); // appending movie to the main
        }
    } catch (error) {
        console.error("There is some error displaying movies:", error);
        main.innerHTML = "<p>There is an error displaying movies. Try again.</p>"
    }
}
   

    // this function shows the varying colors as per the votes
    function showColor(vote) {
        vote = parseFloat(vote); // converting to a float
        
        if (vote >= 8) {
            return 'green';
        
        } else if (vote >= 5) {
            return 'orange';

        } else {
            return 'red';
        }

    }


    // this function clears the buttons that are clicked earlier to start anew
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

   
    // this function shows the movies as per the genres that are selected by the user
    var selectedgenre = [];
     var allMovies = [];    
    
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
                  selectedgenre.push(genre.id);  // adding selected genre to the array
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
                  console.log ("all movies sent.", allMovies);
                  
                }
              })
                highlightSelection();

            })

            tagsEl.append(obj);
        })
    }


    
// this function is intending to send all the movies of the selected genres to the server
// still having problems while adding movies to the list directory I have taken from the movie api documentation, list id seems to be a problem here

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
  
    const listId = 12345; // giving an id number, may be this is the not the correct way
    
    fetch(`https://api.themoviedb.org/3/list/{list_id}/add_item`, options)
     
    .then(response => response.json())
    .then(data => {
      console.log('Movies of the selected genres are added successfully', data);
    
      console.log("Movies sent:", movies);
    })
  
    .catch((error) => {
      console.error('There is some error adding the movies:', error); 
    })
  
  }
  


// to know which tag was selected earlier
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
  

export { getMovies, showMovies, showColor, clearButtons, setGenre, sendAllMovies, highlightSelection }