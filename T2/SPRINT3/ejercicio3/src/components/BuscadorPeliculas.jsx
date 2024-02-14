import React, { useState } from 'react';

const BuscadorPeliculas = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '5f297e89';

  const handleBusqueda = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://www.omdbapi.com/?s=${terminoBusqueda}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setResultados(data.Search);
      } else {
        setResultados([]);
      }
    } catch (error) {
      setError('Error al realizar la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Buscador de películas</h2>
      <div>
        <label htmlFor="terminoBusqueda">Buscar película:</label>
        <input
          type="text"
          id="terminoBusqueda"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button onClick={handleBusqueda} disabled={loading}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}

      {error && <p>{error}</p>}

      {resultados.length > 0 && (
        <ul>
          {resultados.map((pelicula) => (
            <li key={pelicula.imdbID}>
              {pelicula.Title} ({pelicula.Year})
            </li>
          ))}
        </ul>
      )}

      {resultados.length === 0 && !loading && !error && (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default BuscadorPeliculas;
