import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const { handleCloseModal, handleNavigate, selectedImageIndex, images } = this.props;

    return (
      <div className='modal'>
        <button onClick={() => handleNavigate('prev')} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)' }}>{'<'}</button>
        <button onClick={() => handleNavigate('next')} style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>{'>'}</button>
        <button onClick={handleCloseModal} style={{ position: 'absolute', top: 10, right: 10 }}>X</button>
        <img
          src={images[selectedImageIndex].urls.regular}
          alt={images[selectedImageIndex].alt_description}
          style={{ maxWidth: '80%', maxHeight: '80%' }}
        />
      </div>
    );
  }
}

export default Modal;
