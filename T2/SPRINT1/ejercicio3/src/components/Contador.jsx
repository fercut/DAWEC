import React, { useState } from 'react';

const ContadorClick = () => {
  const [contador, setContador] = useState(0);

  const incremento = () => {
    setContador(contador + 1);
  };

  return (
    <div>
      <h1>Contador de click : {contador}</h1>
      <button onClick={incremento}>+1</button>
    </div>
  );
};

export default ContadorClick;
