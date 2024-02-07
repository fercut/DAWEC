import React, { Component } from 'react';
import sirenaInicioMP3 from '../assets/inicio.mp3';
import sirenaDescansoMP3 from '../assets/descanso.mp3';

class Cronometro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiempo: 0,
      activo: false,
      intervalo2Min: false,
      sirenaInicio: new Audio(sirenaInicioMP3),
      sirenaDescanso: new Audio(sirenaDescansoMP3),
    };
    this.intervalo = null;
  }

  iniciarCronometro = () => {
    this.setState({ activo: true });
    this.intervalo = setInterval(() => {
      this.setState((prevState) => ({
        tiempo: prevState.tiempo + 1,
      }));
      this.verificarIntervalos();
    }, 10); // Actualizar cada centésima de segundo
  };

  pausarCronometro = () => {
    this.setState({ activo: false });
    clearInterval(this.intervalo);
  };

  reiniciarCronometro = () => {
    this.setState({ tiempo: 0, activo: false });
    clearInterval(this.intervalo);
  };

  componentWillUnmount() {
    clearInterval(this.intervalo);
  }

  verificarIntervalos = () => {
    const { tiempo, intervalo2Min } = this.state;

    // Primer intervalo de 2 minutos
    if (intervalo2Min && tiempo === 12000) {
      this.sirena1();
      setTimeout(() => {
        this.sirena1();
      }, 30000);
      this.setState({ intervalo2Min: false });
    }

    // Segundo intervalo de 30 segundos
    if (!intervalo2Min && tiempo === 15000) {
      this.sirena2();
      this.setState({ intervalo2Min: true });
    }
  };

  sirena1 = () => {
    this.state.sirenaInicio.play();
  };

  sirena2 = () => {
    this.state.sirenaDescanso.play();
  }

  formatearTiempo = (tiempo) => {
    const minutos = Math.floor(tiempo / 6000);
    const segundos = Math.floor((tiempo % 6000) / 100);
    const centesimas = tiempo % 100;
    return `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}:${centesimas < 10 ? '0' : ''}${centesimas}`;
  };

  render() {
    return (
      <div>
        <h1>CRONOMETRO</h1>
        <p className='time'>{this.formatearTiempo(this.state.tiempo)}</p>
        <label>
          Boxeo mode:
          <input
            type="checkbox"
            checked={this.state.intervalo2Min}
            onChange={() => this.setState((prevState) => ({ intervalo2Min: !prevState.intervalo2Min }))}
          />
        </label>
        <button onClick={this.iniciarCronometro} disabled={this.state.activo}>
          Iniciar
        </button>
        <button onClick={this.pausarCronometro} disabled={!this.state.activo}>
          Pausar
        </button>
        <button onClick={this.reiniciarCronometro}>Reiniciar</button>
        <p>El modo boxeo crea intervalos de 2 min de ejercicio y 30 segundos de descanso</p>
      </div>
    );
  }
}

export default Cronometro;
