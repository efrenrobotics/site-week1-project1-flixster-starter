const grid = document.querySelector("#movies-grid");
const apiKey = "e6df5ce0d6c30a501b6e37014f9b5766";
let pageNum = 1;
let searchMore = false;

/***** Movie Card *****/
// @movieInfo - would be the array of JSON movies
// loads each movie card into the grid
function loadCards(movieInfo) {
  movieInfo.forEach((movie) => {
    /* 
        movie-card structure
        ***** POSTER/IMAGE ********
        ********* title ***********
        ********* rating **********
        */
    const movieCard = document.createElement("div");
    movieCard.setAttribute("class", "movie-card");

    const image = document.createElement("img");
    image.setAttribute("class", "movie-poster");
    const imageURL = "http://tmdb.org/t/p/w342";
    image.src = imageURL + movie.poster_path;
    image.alt = movie.title;

    const title = document.createElement("h3");
    title.setAttribute("class", "movie-title");
    title.innerText = movie.title;

    const rating = document.createElement("h3");
    rating.setAttribute("class", "movies-votes");
    const rateEmoji = rateApp(movie.vote_average);
    rating.innerHTML = `${movie.vote_average}  ${rateEmoji}`;

    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(rating);

    grid.appendChild(movieCard);
  });
}

/* LOAD MORE - load next movie page into the screen */
const loadBtn = document.querySelector("#load-more-movies-btn");
loadBtn.addEventListener("click", function (searchMore) {
  if (searchMore) {
  }
  apiCall();
});

/* SEARCH MOVIES */
const searchForm = document.getElementById("search-input");
searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  grid.innerHTML = "";
  const searchResult = document.getElementsByName("movie-name")[0].value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchResult}`;
  const res = await fetch(url);
  const data = await res.json();
  const results = data.results;
  const searchMore = true;
  loadCards(results);
});

/***** FETCH API *****/
/* Async functions, serve as futures and waits for data to fetch and process to finish */
const apiCall = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}`;
  const res = await fetch(url);
  const data = await res.json();
  const results = data.results;
  loadCards(results);
  pageNum++;
};

/* RESET TO ORIGINAL PAGE */
const resetBtn = document.getElementById("close-search-btn");
resetBtn.addEventListener("click", function () {
  grid.innerHTML = "";
  pageNum = 1;
  apiCall();
});

/***** Rating System *****/
function rateApp(rating) {
  if (rating >= 8) {
    return "&#x1F603;";
  } else if (rating > 6) {
    return "&#x1F642;";
  } else if (rating > 4) {
    return "&#x1F605;";
  } else {
    return "&#x1F92E;";
  }
}

/* Initial movie load */
apiCall();
