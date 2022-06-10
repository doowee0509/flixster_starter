//global constants
const API_KEY = 'f10d0a665e933aee4441b4bad7332cc4'
const searchUrl = 'https://api.themoviedb.org/3/search/movie?'
const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?'
const exploreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false`
const trendingUrl = 'https://api.themoviedb.org/3/trending/all/week?'
const tvUrl = 'https://api.themoviedb.org/3/tv/popular?'
const genresUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false`
const basePosterUrl = 'https://image.tmdb.org/t/p/w200'
const results = document.querySelector('.movies-grid')
const searchInput = document.querySelector('#search-input')
const form = document.querySelector('.search-form')
const showMoreBtn = document.querySelector('#load-more-movies-btn')
const closeSearchBtn = document.querySelector('#close-search-btn')
const menuBarTabs = document.querySelectorAll('.menu-bar-item')
const nowPlayingTab = document.querySelector('#now-playing')
const exploreTab = document.querySelector('#explore')
const trendingTab = document.querySelector('#trending')
const tvTab = document.querySelector('#tv')
const genresList = document.querySelector('.genres-list')
const genres = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Kids': 10762,
    'Music': 10402,
    'Mystery': 9648,
    'News': 10763,
    'Reality': 10764,
    'Romance': 10749,
    'Science Fiction': 878,
    'Soap': 10766,
    'TV Movie': 10770,
    'Talk': 10767,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
}
//global variables
var page = 1
var mode = 'now-playing'
var currKeywords = ''
var currGenresId = 0
form.addEventListener('submit', searchMovie)
showMoreBtn.addEventListener('click', showMoreResults)
closeSearchBtn.addEventListener('click', closeSearch)
nowPlayingTab.addEventListener('click', nowPlaying)
exploreTab.addEventListener('click', explore)
trendingTab.addEventListener('click', getTrending)
tvTab.addEventListener('click', getTvShows)
genresList.addEventListener('click', searchGenres)


async function searchMovie(e) {
    //prevent page from re-loading
    e.preventDefault()

    //scroll to top
    topFunction()

    //hide close search btn
    closeSearchBtn.style.display = 'none'
    //setting up the api url and reset page to 1
    page = 1
    mode = 'search'
    var searchTerm = searchInput.value.split(' ').join('+')
    currKeywords = searchTerm
    let apiUrl = searchUrl + `api_key=${API_KEY}&query=${searchTerm}&page=${page}`


    //getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
    // reset the form
    form.reset()
}

async function nowPlaying() {
    //selecting tab on the menu bar
    mode = 'now-playing'
    toggleActive()

    //scroll to top
    topFunction()

    //hide close search btn
    closeSearchBtn.style.display = 'none'

    let apiUrl = nowPlayingUrl + `api_key=${API_KEY}&page=${page}`
    //getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
}

async function explore() {
    //selecting tab on the menu bar
    mode = 'explore'
    toggleActive()

    //scroll to top
    topFunction()

    //hide close search btn
    closeSearchBtn.style.display = 'none'

    let apiUrl = exploreUrl + `&page=${page}`
    //getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
}

async function getTrending() {
    //selecting tab on the menu bar
    mode = 'trending'
    toggleActive()

    //scroll to top
    topFunction()

    //hide close search btn
    closeSearchBtn.style.display = 'none'

    let apiUrl = trendingUrl + `api_key=${API_KEY}&page=${page}`
    //getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
}

async function getTvShows() {
    //selecting tab on the menu bar
    mode = 'tv'
    toggleActive()

    //scroll to top
    topFunction()

    //hide close search btn
    closeSearchBtn.style.display = 'none'


    let apiUrl = tvUrl + `api_key=${API_KEY}&page=${page}`
    //getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
}

async function searchGenres(e) {
    //selecting tab on the menu bar
    mode = 'genres'
    toggleActive()

    //hide close search btn
    closeSearchBtn.style.display = 'none'

    //scroll to top
    topFunction()

    //getting the genres id
    var genresId = genres[e.path[0].innerHTML]
    currGenresId = genresId

    let apiUrl = genresUrl + `&page=${page}&with_genres=${genresId}`

    //geting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    displayResults(responseData.results,0)
}

async function showMoreResults(){
    // show the close button 
    closeSearchBtn.style.display = 'block'

    //setting up trending api url
    page++;
    let apiUrl = ''
    switch(mode)  {
    case 'now-playing':
        apiUrl = nowPlayingUrl + `api_key=${API_KEY}&page=${page}`
        break
    case 'search':
        break
        apiUrl = searchUrl + `api_key=${API_KEY}&query=${currKeywords}&page=${page}`
        break
    case 'explore':
        apiUrl = exploreUrl + `&page=${page}`
        break
    case 'tv':
        apiUrl = tvUrl + `api_key=${API_KEY}&page=${page}`
        break

    case 'genres':
        apiUrl = genresUrl + `&page=${page}&with_genres=${currGenresId}`
        break
    default:
        apiUrl = nowPlayingUrl + `api_key=${API_KEY}&page=${page}`
    }

    // getting the results
    let response = await fetch(apiUrl)
    let responseData = await response.json()
    console.log('responseData is:', responseData)
    displayResults(responseData.results, 1)
    console.log(apiUrl)
    
}

function displayResults(data, showMore) {
    console.log(data)
    // var size = data.length < 9 ? 9 : data.length
    if (!showMore){
        results.innerHTML = ``
    }
    if (page == 1 && data.length == 0) {
        results.innerHTML = `<h1>Sorry! No results found :(</h1>`
        results.style.display = 'flex'
        results.style.alignItems = 'center'
        results.style.justifyContent = 'center'
        showMoreBtn.style.display = 'none'
        closeSearchBtn.style.display = 'none'
    }
    else {
        results.style.display = 'grid'
        showMoreBtn.style.display = 'block'
    }
    for(let i = 0; i < data.length; i++) {
        var imgUrl = data[i].poster_path !== null ? basePosterUrl + data[i].poster_path : 'https://www.millersearles.com/wp-content/uploads/2016/10/200x300-placeholder.jpg'
        var title = typeof data[i].original_title === 'undefined' ? data[i].original_name : data[i].original_title
        results.innerHTML += `
        <div class='movie-card'>
        <img class='movie-poster' src=${imgUrl} alt='movie-poster'>
        <h1 class='movie-title'>${title}</h1>
        <h1 class='movie-votes'>Rating: ${data[i].vote_average} / 10</h1>
        <span class='movie-id'>${data[i].id}</span>
    </div>
        `
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function closeSearch(){
    closeSearchBtn.style.display = 'none'
    page = 1
    topFunction()
    setTimeout(nowPlaying, 500)
}

function toggleActive() {
    for (let i = 0; i < menuBarTabs.length; i++) {
        menuBarTabs[i].classList.remove('active')
    }
    elem = document.querySelector(`#${mode}`)
    elem.classList.toggle('active')
}

window.onload = function (){
    nowPlaying()
}
