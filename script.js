//global constants
const API_KEY = 'f10d0a665e933aee4441b4bad7332cc4'
const searchUrl = 'https://api.themoviedb.org/3/search/movie?'
const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?'
const exploreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false`
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
const genresTab = document.querySelector('#genres')
//global variables
var page = 1
var mode = 'now-playing'
var currKeywords = ''
form.addEventListener('submit', searchMovie)
showMoreBtn.addEventListener('click', showMoreResults)
closeSearchBtn.addEventListener('click', closeSearch)
nowPlayingTab.addEventListener('click', nowPlaying)
exploreTab.addEventListener('click', explore)
// nowPlayingTab.addEventListener('click', nowPlaying)
// nowPlayingTab.addEventListener('click', nowPlaying)
// nowPlayingTab.addEventListener('click', nowPlaying)


async function searchMovie(e) {
    //prevent page from re-loading
    e.preventDefault()

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

    let apiUrl = exploreUrl + `&page=${page}`
    //getting the results
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
        break;
    case 'search':
        apiUrl = searchUrl + `api_key=${API_KEY}&query=${currKeywords}&page=${page}`
        break;
    case 'explore':
        apiUrl = exploreUrl + `&page=${page}`
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
        results.innerHTML += `
        <div class='movie-card'>
        <img class='movie-poster' src=${imgUrl} alt='movie-poster'>
        <h1 class='movie-title'>${data[i].original_title}</h1>
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

// TODO: possible img sizes 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', or 'original'