import React, { Component } from 'react';

class FormularioRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        email: '',
        password: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    let { username, email, password } = this.state;
    let errors = {
      username: '',
      email: '',
      password: '',
    };
    let isValid = true;

    // Validación del nombre de usuario
    if (username.trim() === '') {
      errors.username = 'El nombre de usuario es obligatorio';
      isValid = false;
    }

    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Ingresa un correo electrónico válido';
      isValid = false;
    }

    // Validación de la contraseña
    if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      // Aquí puedes realizar acciones adicionales con los datos validados
      console.log('Formulario válido, datos enviados:', this.state);
    } else {
      console.log('Formulario inválido, corrige los errores.');
    }
  };

  render() {
    const { username, email, password, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            style={{ borderColor: errors.username && 'red' }}
          />
          <div style={{ color: 'red' }}>{errors.username}</div>
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            style={{ borderColor: errors.email && 'red' }}
          />
          <div style={{ color: 'red' }}>{errors.email}</div>
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            style={{ borderColor: errors.password && 'red' }}
          />
          <div style={{ color: 'red' }}>{errors.password}</div>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    );
  }
}

export default FormularioRegistro;
