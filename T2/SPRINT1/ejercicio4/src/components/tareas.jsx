import React, { useState } from 'react'

const Tareas = () => {
  const [listar, setListar] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const listarTarea= () => {
    setListar(!listar);
  }
  
  const añadirTarea = () => {
    const nuevaTarea = {titulo, descripcion};
    if(titulo){
        setTareas([...tareas, nuevaTarea]);
        setTitulo('');
        setDescripcion('');
    }
    setListar(false);
  }

  const borrarTarea = (index) => {
    // Crea una copia del array de tareas y elimina la tarea en la posición index
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  }

  return (
    <div>
        <h1>ToDo A Pepe</h1>

        <button onClick={ listarTarea }>
            Nueva tarea
        </button>

        {listar && (
            <div>
            <input
                type="text"
                placeholder="Nombre de la tarea"
                className='titulo'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción de la tarea"
              className='descripcion'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <button onClick={ añadirTarea }>Guardar tarea</button>
          </div>
        )}

        <ul>
            {tareas.map((tarea, index) => (
                <li key={index}>
                    <strong>{tarea.titulo}</strong>: {tarea.descripcion}
                    <input type="checkbox"/>
                    <button onClick={() => borrarTarea(index)}>Borrar</button>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default Tareas;