import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    const { searchTerm, handleSearchChange, handleSearch } = this.props;

    return (
      <div>
        <h1>BUSCADOR DE IMAGENES</h1>
        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    );
  }
}
export default Navbar;
