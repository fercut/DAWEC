import React, { Component } from 'react';
import '../app.css';

class AppTareas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listar: false,
      tareas: this.cargarTareas(),
      titulo: '',
      descripcion: '',
      categoria: 'importante',
      tareaEnEdicion: null,
      indexEnEdicion: null,
      filtroCategoria: '',
      filtroCompletado: '',
    };
  }

  componentDidMount() {
    this.cargarTareas();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tareas !== this.state.tareas) {
      this.actualizarTareasLocalStorage();
    }
  }

  cargarTareas() {
    const storedTareas = localStorage.getItem('tareas');
    return storedTareas ? JSON.parse(storedTareas) : [];
  }

  actualizarTareasLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.state.tareas));
  }

  listarTarea = () => {
    this.setState({
      listar: !this.state.listar,
      tareaEnEdicion: null,
      indexEnEdicion: null,
    });
  };

  añadirTarea = () => {
    const { titulo, descripcion, categoria } = this.state;
    const nuevaTarea = {
      titulo,
      descripcion: descripcion || '-',
      categoria,
      realizada: false,
    };

    if (titulo) {
      this.setState((prevState) => ({
        tareas: [...prevState.tareas, nuevaTarea],
        titulo: '',
        descripcion: '',
        categoria: 'importante',
        listar: false,
      }));
    }
  };

  borrarTarea = (index) => {
    this.setState((prevState) => {
      const nuevasTareas = [...prevState.tareas];
      nuevasTareas.splice(index, 1);
      return { tareas: nuevasTareas };
    });
  };

  filtrarTareasPorCategoria = (categoria) => {
    return this.state.tareas.filter((tarea) => tarea.categoria === categoria);
  };

  editarTarea = (index) => {
    this.setState({
      tareaEnEdicion: this.state.tareas[index],
      indexEnEdicion: index,
      listar: false,
    });
  };

  guardarEdicion = () => {
    const nuevasTareas = [...this.state.tareas];
    nuevasTareas[this.state.indexEnEdicion] = this.state.tareaEnEdicion;
    this.setState({
      tareas: nuevasTareas,
      tareaEnEdicion: null,
      indexEnEdicion: null,
    });
  };

  filtrarTareas = () => {
    let tareasFiltradas = [...this.state.tareas];

    if (this.state.filtroCategoria) {
      tareasFiltradas = tareasFiltradas.filter(
        (tarea) => tarea.categoria === this.state.filtroCategoria
      );
    }

    if (this.state.filtroCompletado !== '') {
      const completado = this.state.filtroCompletado === 'true';
      tareasFiltradas = tareasFiltradas.filter(
        (tarea) => tarea.realizada === completado
      );
    }

    return tareasFiltradas;
  };

  getColorByCategoria = (categoria) => {
    switch (categoria) {
      case 'importante':
        return 'rgba(255, 0, 0, 0.15)';
      case 'trabajo':
        return 'rgba(0, 0, 255, 0.15)';
      case 'recados':
        return 'rgba(0, 255, 0, 0.15)';
      case 'estudios':
        return 'rgba(255, 255, 0, 0.15)';
      default:
        return 'transparent';
    }
  };

  getColorByCategoriaTd = (categoria) => {
    switch (categoria) {
      case 'importante':
        return 'rgba(255, 0, 0, 0.08)';
      case 'trabajo':
        return 'rgba(0, 0, 255, 0.08)';
      case 'recados':
        return 'rgba(0, 255, 0, 0.08)';
      case 'estudios':
        return 'rgba(255, 255, 0, 0.08)';
      default:
        return 'transparent';
    }
  };

  render() {
    return (
      <div>
        <h1>ToDo A Pepe</h1>

        <button className={'nueva'} onClick={this.listarTarea}>
          Nueva tarea
        </button>

        {this.state.listar && (
          <div>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              className="titulo"
              value={this.state.titulo}
              onChange={(e) => this.setState({ titulo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción de la tarea"
              className="descripcion"
              value={this.state.descripcion}
              onChange={(e) => this.setState({ descripcion: e.target.value })}
            />
            <select
              value={this.state.categoria}
              onChange={(e) => this.setState({ categoria: e.target.value })}
            >
              <option value="importante">Importantes</option>
              <option value="trabajo">Trabajo</option>
              <option value="recados">Recados</option>
              <option value="estudios">Estudios</option>
            </select>
            <button onClick={this.añadirTarea}>Guardar tarea</button>
          </div>
        )}

        {this.state.tareaEnEdicion && (
          <div>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              className="titulo"
              value={this.state.tareaEnEdicion.titulo}
              onChange={(e) =>
                this.setState({
                  tareaEnEdicion: {
                    ...this.state.tareaEnEdicion,
                    titulo: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Descripción de la tarea"
              className="descripcion"
              value={this.state.tareaEnEdicion.descripcion}
              onChange={(e) =>
                this.setState({
                  tareaEnEdicion: {
                    ...this.state.tareaEnEdicion,
                    descripcion: e.target.value,
                  },
                })
              }
            />
            <select
              value={this.state.tareaEnEdicion.categoria}
              onChange={(e) =>
                this.setState({
                  tareaEnEdicion: {
                    ...this.state.tareaEnEdicion,
                    categoria: e.target.value,
                  },
                })
              }
            >
              <option value="importante">Importantes</option>
              <option value="trabajo">Trabajo</option>
              <option value="recados">Recados</option>
              <option value="estudios">Estudios</option>
            </select>
            <button onClick={this.guardarEdicion}>Guardar edición</button>
          </div>
        )}

        <div className="contenedor">
          <div>
            <div className={'filtrosContenedor'}>
              <select
                value={this.state.filtroCompletado}
                onChange={(e) =>
                  this.setState({ filtroCompletado: e.target.value })
                }
              >
                <option value="">Todos</option>
                <option value="true">Completados</option>
                <option value="false">No completados</option>
              </select>
              <select
                value={this.state.filtroCategoria}
                onChange={(e) =>
                  this.setState({ filtroCategoria: e.target.value })
                }
              >
                <option value="">Categorias</option>
                <option value="">Todos</option>
                <option value="importante">Importantes</option>
                <option value="trabajo">Trabajo</option>
                <option value="recados">Recados</option>
                <option value="estudios">Estudios</option>
              </select>
            </div>
            <ul>
              {this.filtrarTareas().map((tarea, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: this.getColorByCategoria(tarea.categoria),
                  }}
                >
                  <strong>
                    {tarea.titulo
                      ? tarea.titulo.charAt(0).toUpperCase() +
                        tarea.titulo.slice(1)
                      : ''}
                    :
                  </strong>{' '}
                  {tarea.descripcion
                    ? tarea.descripcion.charAt(0).toUpperCase() +
                      tarea.descripcion.slice(1)
                    : ''}
                  <input
                    type="checkbox"
                    checked={tarea.realizada}
                    onChange={() => {
                      const nuevasTareas = [...this.state.tareas];
                      nuevasTareas[index].realizada = !tarea.realizada;
                      this.setState({ tareas: nuevasTareas });
                    }}
                  />
                  <button onClick={() => this.editarTarea(index)}>Editar</button>
                  <button onClick={() => this.borrarTarea(index)}>
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <table>
            <tbody>
              {['importante', 'trabajo', 'recados', 'estudios'].map(
                (categoria) => (
                  <React.Fragment key={categoria}>
                    <tr>
                      <th
                        colSpan="5"
                        style={{
                          backgroundColor: this.getColorByCategoria(
                            categoria
                          ),
                        }}
                      >
                        {categoria.toUpperCase()}
                      </th>
                    </tr>
                    {this.filtrarTareasPorCategoria(categoria).map(
                      (tarea, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor: this.getColorByCategoriaTd(
                              categoria
                            ),
                          }}
                        >
                          <td>
                            <strong>
                              {tarea.titulo
                                ? tarea.titulo.charAt(0).toUpperCase() +
                                  tarea.titulo.slice(1)
                                : ''}
                            </strong>
                          </td>
                          <td>
                            {tarea.descripcion
                              ? tarea.descripcion
                                  .charAt(0)
                                  .toUpperCase() + tarea.descripcion.slice(1)
                              : ''}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                this.editarTarea(
                                  this.state.tareas.findIndex(
                                    (t) => t.titulo === tarea.titulo
                                  )
                                )
                              }
                            >
                              Editar
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                this.borrarTarea(
                                  this.state.tareas.findIndex(
                                    (t) => t.titulo === tarea.titulo
                                  )
                                )
                              }
                            >
                              Borrar
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AppTareas;
