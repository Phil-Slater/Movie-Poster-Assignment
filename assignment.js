const moviesDiv = document.getElementById("moviesDiv")
const infoDiv = document.getElementById("infoDiv")

function getPosterList() {
    let request = new XMLHttpRequest()
    request.onload = function () {
        let batmanList = this.responseText
        batmanParsed = JSON.parse(batmanList)
        const batmanListItems = batmanParsed.Search.map((movie) => {
            return `<div id="list"><img src="${movie.Poster}" id="moviePoster" onclick="showMovieDetails('${movie.imdbID}')" width30%"/>
            <br>
            <h4 id="movieTitle">${movie.Title}</h4></div>
            `
        })
        moviesDiv.innerHTML = batmanListItems.join('')

    }

    request.open('GET', "http://www.omdbapi.com/?s=Batman&page=2&apikey=29ed1e5")
    request.send()
}

function showMovieDetails(imdbID) {
    moviesDiv.addEventListener("click", function () {
        // const list = document.getElementById("list")
        // list.innerHTML = ''
        const requestInfo = new XMLHttpRequest()
        requestInfo.onload = function () {
            infoList = this.responseText
            infoParsed = JSON.parse(infoList)
            infoDiv.innerHTML = `<h2>${infoParsed.Title}</h2>
            <h4>Year: ${infoParsed.Year}</h4>
            <h4>Rated: ${infoParsed.Rated}</h4>
            <h4>Released: ${infoParsed.Released}</h4>
            <h4>Director: ${infoParsed.Director}</h4>`
        }
        requestInfo.open('GET', "http://www.omdbapi.com/?i=" + imdbID + "&apikey=29ed1e5")
        requestInfo.send()
    })
}

getPosterList()

