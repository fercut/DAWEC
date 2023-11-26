const apiKey = '7f89696ff75b02d3ab311e1925fdfc79'; // Reemplaza con tu clave de API de TMDB
    let page = 1;
    const genreFilter = document.getElementById('genre-filter');
    const searchInput = document.getElementById('search-input');
    const movieContainer = document.getElementById('movie-container');
    const loadMoreButton = document.getElementById('load-more');

    // Función para obtener las últimas tendencias al cargar la página
    async function getTrendingMovies() {
      try {
        const apiUrl = 'https://api.themoviedb.org/3/trending/movie/week';
        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            page: page,
            language: 'es',
          },
        });

        const movies = response.data.results;
        displayMovies(movies);

      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
      }
    }

    // Función para mostrar películas por género
    async function showMoviesByGenre() {
      page = 1;
      await getMovies();
    }

    // Función para obtener más películas al hacer clic en "Ver más"
    async function loadMoreMovies() {
      page++;
      await getMovies(true); // El parámetro true indica que es una carga adicional
    }

    // Función para obtener películas según los parámetros actuales
    async function getMovies(append = false) {
      try {
        const apiUrl = searchInput.value.trim()
          ? 'https://api.themoviedb.org/3/search/movie'
          : 'https://api.themoviedb.org/3/discover/movie';

        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            page: page,
            language: 'es',
            query: searchInput.value.trim(),
            with_genres: genreFilter.value,
          },
        });

        const movies = response.data.results;
        displayMovies(movies, append);

        // Mostrar u ocultar el botón "Ver más" según la disponibilidad de más resultados
        loadMoreButton.style.display = response.data.total_pages > page ? 'block' : 'none';

      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
      }
    }

    // Función para mostrar las películas en el contenedor
    function displayMovies(movies, append) {
      if (!append) {
        movieContainer.innerHTML = ''; // Limpiar el contenedor si no es una carga adicional
      }

      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
          <h3>${movie.title}</h3>
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
          <p>Año: ${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
          <p>${movie.overview}</p>
          <p>Valoración: ${movie.vote_average}</p>
        `;
        movieContainer.appendChild(movieCard);
      });
    }

    // Cargar las últimas tendencias al cargar la página
    getTrendingMovies();