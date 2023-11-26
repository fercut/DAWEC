const apiKey = '7f89696ff75b02d3ab311e1925fdfc79';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

let page = 1;
let currentSearch = {};
const favoriteMoviesKey = 'favoriteMovies';
let favoriteMovies = JSON.parse(localStorage.getItem(favoriteMoviesKey)) || [];
const moviesContainer = document.getElementById('movies-container');
const loadMoreButton = document.getElementById('load-more');
const keywordInput = document.getElementById('keyword-input');
const genreSelect = document.getElementById('genre-select');
const searchButton = document.getElementById('search-button');
const listFavoritesButton = document.getElementById('list-favorites-button');

const genresMap = {};

const toggleFavorite = (movieId) => {
  const index = favoriteMovies.indexOf(movieId);
  if (index === -1) {
    favoriteMovies.push(movieId);
  } else {
    favoriteMovies.splice(index, 1);
  }
  localStorage.setItem(favoriteMoviesKey, JSON.stringify(favoriteMovies));
};

const fetchGenres = () => {
  fetch(`${genresUrl}?api_key=${apiKey}&language=es-ES`)
    .then(response => response.json())
    .then(data => {
      data.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);

        genresMap[genre.id] = genre.name;
      });
    })
    .catch(error => console.error('Error al obtener datos de géneros de la API:', error));
};

const fetchMovies = () => {
  const genreFilter = currentSearch.genre ? `&with_genres=${currentSearch.genre}` : '';
  const url = `${apiUrl}?api_key=${apiKey}&language=es-ES&page=${page}${genreFilter}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.slice(0, 8).forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const movieContent = `
          <h2>${movie.title} (${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
          <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
          <p><strong>Resumen:</strong> ${movie.overview}</p>
          <p><strong>Puntuación:</strong> ${movie.vote_average}</p>
          <button class="favorite-button" data-movie-id="${movie.id}" onclick="toggleFavorite(${movie.id})">Agregar a favoritos</button>
        `;
      
        movieDiv.innerHTML = movieContent;
        moviesContainer.appendChild(movieDiv);
      });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
};

const searchMovies = () => {
    page = 1;
    moviesContainer.innerHTML = '';
  
    const keyword = keywordInput.value.trim();
    const genre = genreSelect.value;
    currentSearch = { keyword, genre };
  
    const genreFilter = genre ? `&with_genres=${genre}` : '';
    const query = keyword ? `&query=${keyword}` : '';
    const url = `${searchUrl}?api_key=${apiKey}&language=es-ES&page=${page}${genreFilter}${query}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.results.slice(0, 8).forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
  
  
          const movieContent = `
            <h2>${movie.title} (${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
            <p><strong>Resumen:</strong> ${movie.overview}</p>
            <p><strong>Puntuación:</strong> ${movie.vote_average}</p>
            <button class="favorite-button" data-movie-id="${movie.id}" onclick="toggleFavorite(${movie.id})">Agregar a favoritos</button>
          `;
  
          movieDiv.innerHTML = movieContent;
          moviesContainer.appendChild(movieDiv);
        });
  
        fetchMovies();
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  };
  
  const showFavorites = () => {
    page = 1;
    moviesContainer.innerHTML = '';
    currentSearch = { genre: '', keyword: '' };
  
    favoriteMovies.forEach((movieId) => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`;
      fetch(url)
        .then(response => response.json())
        .then(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
  
          const movieContent = `
            <h2>${movie.title} (${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
            <p><strong>Resumen:</strong> ${movie.overview}</p>
            <p><strong>Puntuación:</strong> ${movie.vote_average}</p>
            <button class="favorite-button" data-movie-id="${movie.id}" onclick="toggleFavorite(${movie.id})">Quitar de favoritos</button>
          `;
  
          movieDiv.innerHTML = movieContent;
          moviesContainer.appendChild(movieDiv);
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
    });
  
    // Ocultar el botón "Ver Más" al mostrar las películas favoritas
    loadMoreButton.style.display = 'none';
  };

const loadMore = () => {
  page += 1;
  fetchMovies();
  };
    
fetchGenres();
fetchMovies();

loadMoreButton.addEventListener('click', loadMore);
searchButton.addEventListener('click', searchMovies);
listFavoritesButton.addEventListener('click', showFavorites);
