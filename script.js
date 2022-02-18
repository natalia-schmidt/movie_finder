const searchBtn = document.getElementById('search-btn'.toLowerCase());
const movieList = document.getElementById('movie');
const movieDetailsContent = document.querySelector('.movie-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const apiKey = 'api_key=' //write your key here;
const baseUrl = 'https://api.themoviedb.org/3';
let genreID = "";
const imgUrl = 'https://image.tmdb.org/t/p/w500';
let html = '';

//Search the genre
async function getGenreID(){
    let searchInputTxt = document.getElementById('search-input').value.trim();

    const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=en-US`);
    const genreJSON = await data.json();


    for (let i = 0; i<=18; i++) {
        let genreName = genreJSON.genres[i].name.toLowerCase()
        if (genreName == searchInputTxt) {
            genreID = genreJSON.genres[i].id;
            getMovie()
            break
        }
        if (i == 18) {
            html = "Sorry, we didn't find any movie!";
            movieList.classList.add('notFound');
            movieList.innerHTML = html;
            break
        }
    }
};

//Find the movie
async function getMovie() {

    const data = await fetch(`${baseUrl}/discover/movie?with_genres=${genreID}&${apiKey}`);
    const apiUrl = await data.json();
    const response = apiUrl.results

    movieList.classList.remove('notFound')
    html = "";

    response.forEach(movie => {
        const {title, poster_path, overview, id} = movie;
        html += `
            <div class = "movie-item" data-id= "${id}">
                <div class = "movie-img">
                    <img src = "${imgUrl+poster_path}">
                </div>
                <div class = "movie-name">
                    <h3>${title}</h3>
                </div>
                <div class = "overview">
                    <p>${overview}</p>
                </div>
            </div>
        `;
    });
    movieList.innerHTML = html;
};

searchBtn.addEventListener('click', getGenreID);