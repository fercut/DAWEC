import React from 'react';

const ListaFrutas = ({ frutas }) => {
  return (
    <div>
      <h2>Lista de Frutas:</h2>
      <ul>
        {frutas.map((fruta, index) => (
          <li key={index}>
            {fruta.charAt(0).toUpperCase() + fruta.slice(1)}{' '}
            {frutaExiste(fruta) && (
              <img
                src={require(`../resources/${fruta}.png`)}
                alt={`${fruta} imagen`}
                style={{ maxWidth: '50px', maxHeight: '50px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Función para verificar si la imagen de la fruta existe
const frutaExiste = (fruta) => {
  try {
    require(`../resources/${fruta}.png`);
    return true;
  } catch (error) {
    return false;
  }
};

export default ListaFrutas;