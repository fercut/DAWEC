import React, { useState, useEffect } from 'react';

const Tareas = () => {
  const [listar, setListar] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('importante');

  useEffect(() => {
    // Cargar tareas desde localStorage al cargar la página
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    // Guardar tareas en localStorage cada vez que se actualice el estado
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const listarTarea = () => {
    setListar(!listar);
  };

  const añadirTarea = () => {
    const nuevaTarea = { titulo, descripcion, categoria, realizada: false };
    if (titulo) {
      setTareas([...tareas, nuevaTarea]);
      setTitulo('');
      setDescripcion('');
      setCategoria('importante');
    }
    setListar(false);
  };

  const borrarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  const filtrarTareasPorCategoria = (categoria) => {
    return tareas.filter((tarea) => tarea.categoria === categoria);
  };

  return (
    <div>
      <h1>ToDo A Pepe</h1>

      <button onClick={listarTarea}>
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
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="importante">Importantes</option>
            <option value="trabajo">Trabajo</option>
            <option value="recados">Recados</option>
            <option value="estudios">Estudios</option>
          </select>
          <button onClick={añadirTarea}>Guardar tarea</button>
        </div>
      )}

      <table>
        <tbody>
          {['importante', 'trabajo', 'recados', 'estudios'].map((categoria) => (
            <React.Fragment key={categoria}>
              <tr>
                <th colSpan="5">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</th>
              </tr>
              {filtrarTareasPorCategoria(categoria).map((tarea, index) => (
                <tr key={index}>
                  <td>{tarea.titulo}</td>
                  <td>{tarea.descripcion}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={tarea.realizada}
                      onChange={() => {
                        const nuevasTareas = [...tareas];
                        nuevasTareas[index].realizada = !tarea.realizada;
                        setTareas(nuevasTareas);
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => borrarTarea(index)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tareas;
