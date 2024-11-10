const form = document.getElementById("form");
const search = document.getElementById("search");


var selectedgenre = [];


// this form function takes a search key word and gives out all the possible results 
export function searchForm(form, search, getMovies, highlightSelection, API_URL, searchURL) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = search.value;

        selectedgenre=[];
        //highlightSelection()

    try {
    if(searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm) // it is making the GET request
    }
    else {
        getMovies(API_URL); // it takes to the default page 
    }
}catch (error) {
    console.error("There is some error fetching movies:", error);

        }
    })

}



