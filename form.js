const form = document.getElementById("form");
const search = document.getElementById("search");

var selectedgenre = [];



export function searchForm(form, search, getMovies, highlightSelection, API_URL, searchURL) {


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

}



