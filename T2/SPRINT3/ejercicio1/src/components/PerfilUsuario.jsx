import React from 'react';
import { useParams } from 'react-router-dom';

const PerfilUsuario = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Perfil del Usuario: {id}</h2>
    </div>
  );
};

export default PerfilUsuario;
