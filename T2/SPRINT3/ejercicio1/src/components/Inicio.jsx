import React , { useState } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [usuarios, setUsuarios] = useState(['Usuario 1', 'Usuario 2']);
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  
  

  const handleAgregarUsuario = () => {
    if (nuevoUsuario.trim() !== '') {
      setUsuarios([...usuarios, nuevoUsuario]);
      setNuevoUsuario('');
    }
  };

  return (
    <div>
      <h1>Bienvenido a la aplicación de perfiles de usuario</h1>
      <div>
        <label htmlFor="nuevoUsuario">Nuevo Usuario: </label>
        <input
          type="text"
          id="nuevoUsuario"
          value={nuevoUsuario}
          onChange={(e) => setNuevoUsuario(e.target.value)}
        />
        <button onClick={handleAgregarUsuario}>Agregar</button>
      </div>

      <p>Selecciona un perfil:</p>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}> 
            <Link to = {`/usuario/${index+1}`}>{usuario}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Inicio;
