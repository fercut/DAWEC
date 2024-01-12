import React, { useState } from 'react';
import ListaFruta from './ListaFrutas.jsx';

const Frutas = () => {
  const [inputValue, setInputValue] = useState('');
  const [frutasList, setFrutasList] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMostrarClick = () => {
    // Convertir el valor del input en un array separado por espacios
    const frutasArray = inputValue
      .split(/\s|,/)
      .map(fruta => fruta.trim().toLowerCase())
      .filter(fruta => fruta !== '');
    // Actualizar el estado con el nuevo array
    setFrutasList(frutasArray);
  };

  return (
    <div>
      <label htmlFor="lista">Introduce aquí cuántas frutas quieras (separadas por espacios)</label><br />
      <input
        type="text"
        className='frutas'
        style={{ width: '300px' }}
        onChange={handleInputChange}
      />
      <button className='send' onClick={handleMostrarClick}>
        Mostrar
      </button>
      <ListaFruta frutas={frutasList} />
    </div>
  );
};

export default Frutas;
