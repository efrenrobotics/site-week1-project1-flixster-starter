const grid = document.querySelector("#movies-grid");
const movieBtn = document.querySelector("#movie-btn");

const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=e6df5ce0d6c30a501b6e37014f9b5766&page=1';
const apiBaseURL = 'https://api.themoviedb.org/3';
const apiKey = 'e6df5ce0d6c30a501b6e37014f9b5766';

/***** Movie Card *****/
// @movieInfo - would be the array of JSON movies
// loads each movie card into the grid 
function loadCards(movieInfo) {
    movieInfo.forEach(movie => {
        /* 
        movie-card structure
        ***** POSTER/IMAGE ********
        ********* title ***********
        ********* rating **********
        */

        const movieCard = document.createElement("div");
        movieCard.setAttribute("class", "movie-card");

        const image = document.createElement('img');
        image.setAttribute("class", "movie-poster");
        const imageURL = "http://tmdb.org/t/p/w342";
        image.src = imageURL + movie.poster_path;
        image.alt = movie.title;

        const title = document.createElement('h2');
        title.setAttribute("class", "movie-title");
        title.innerText = movie.title;

        const rating = document.createElement('h3');
        rating.setAttribute("class", "movies-votes")
        rating.innerText = 'Rating: ${movie.vote_average}';

        movieCard.appendChild(image);
        movieCard.appendChild(title);
        movieCard.appendChild(rating);
        
        grid.appendChild(movieCard);
    });
}

movieBtn.addEventListener("click", function () {
    createMovieCard();
});

/* LOAD MORE - load N movies into the screen */
const loadBtn = document.querySelector("#load-movies");
loadBtn.addEventListener("click", function () {
    for(let n = 0; n < 5; n++)
        createMovieCard();
});

/***** FETCH API *****/ 
const apiCall = async() => {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;
    console.log(results);

    loadCards(results);
}
apiCall();


