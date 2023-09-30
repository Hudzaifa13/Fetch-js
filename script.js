const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

// event binding
document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('modal-detail-button')) {
        const name = e.target.dataset.name;
        const movieDetail = await getMovieDetail(name);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(name) {
    return fetch('https://swapi.dev/api/people/?search=' + name)
        .then(response => response.json())
        .then(m => m.results[0]);
}

function updateUIDetail(m) {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
    return fetch('https://swapi.dev/api/people/?search=' + keyword)
        .then(response => response.json())
        .then(response => response.results);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}



function showCards(m) {
    return `<div class="col-md-4 my-3">
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">${m.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.gender}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" 
                                data-toggle="modal" data-target="#movieDetailModal" data-name="${m.name}">Show Details</a>
                                </div>
                            </div>
                            </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                                            <div class="row">
                                                <div class="col-md">
                                                <ul class="list-group">
                                                    <li class="list-group-item"><h4>${m.name} | ${m.gender}</h4></li>
                                                    <li class="list-group-item"><strong>Tinggi : </strong> ${m.height} cm</li>
                                                    <li class="list-group-item"><strong>Berat : </strong> ${m.mass} kg</li>
                                                    <li class="list-group-item"><strong>Kelahiran : </strong> ${m.birth_year}</li>
                                                    <li class="list-group-item"><strong>Warna Kulit : </strong> <br> ${m.skin_color}</li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>`;
}