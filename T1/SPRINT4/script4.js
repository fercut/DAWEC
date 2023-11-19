const apiKey = '7f89696ff75b02d3ab311e1925fdfc79';
    let page = 1;
    const genreSelect = document.getElementById('genre');
    const topRatedSelect = document.getElementById('topRated');
    const searchInput = document.getElementById('search-input');
    const moviesContainer = document.getElementById('movies-container');
    const loadMoreButton = document.getElementById('load-more');

    async function getMovies(params) {
      try {
        const apiUrl = 'https://api.themoviedb.org/3/discover/movie';

        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            ...params,
            language: 'es', // Establece el idioma a español
            page: page,
          },
        });

        const movies = response.data.results;

        // Agrega las películas al contenedor
        movies.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.className = 'movie-card';
          movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <p>Año: ${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
            <p>${movie.overview}</p>
            <p>Puntuación: ${movie.vote_average}</p>
          `;
          moviesContainer.appendChild(movieCard);
        });

        // Incrementa el número de página para la próxima solicitud
        page++;

        // Muestra u oculta el botón "Ver más" según la disponibilidad de más resultados
        loadMoreButton.style.display = response.data.total_pages > page ? 'block' : 'none';

      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
      }
    }

    // Manejador de eventos para el botón "Ver más"
    loadMoreButton.addEventListener('click', () => getMovies());

    // Función para mostrar películas al hacer clic en el botón "Mostrar"
    function showMovies() {
      // Reinicia la página a 1 antes de realizar una nueva búsqueda
      page = 1;

      // Limpia el contenedor antes de mostrar nuevas películas
      moviesContainer.innerHTML = '';

      // Llama a la función para obtener las primeras películas
      getMovies({
        with_genres: genreSelect.value,
        'vote_average.gte': topRatedSelect.value === 'true' ? '7' : undefined,
      });
    }

    // Función para realizar una búsqueda por título
    function searchMovies() {
      const searchTerm = searchInput.value;

      if (searchTerm.trim() !== '') {
        // Reinicia la página a 1 antes de realizar la búsqueda
        page = 1;

        // Limpia el contenedor antes de mostrar las películas de la búsqueda
        moviesContainer.innerHTML = '';

        // Llama a la función para obtener las películas según el término de búsqueda
        getMovies({
          query: searchTerm,
        });
      }
    }

    // Muestra las últimas tendencias por defecto al cargar la página
    showMovies();