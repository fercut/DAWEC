import React, { Component } from 'react';

class GaleriaImagenes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImageIndex: null,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = () => {
    const key = 'xNB7nkQULYt5HE2ewFWcDyBzjb61OE-MC2kIsW2LEVc'
    const apiUrl = `https://api.unsplash.com/photos?per_page=12&client_id=${key}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ images: data, selectedImageIndex: null });
      })
      .catch((error) => console.error('Error fetching images:', error));
  };

  handleImageClick = (index) => {
    this.setState({ selectedImageIndex: index });
  };

  handleCloseModal = () => {
    this.setState({ selectedImageIndex: null });
  };

  handleNavigate = (direction) => {
    const { selectedImageIndex, images } = this.state;
    let newIndex;

    if (direction === 'prev') {
      newIndex = (selectedImageIndex - 1 + images.length) % images.length;
    } else if (direction === 'next') {
      newIndex = (selectedImageIndex + 1) % images.length;
    }

    this.setState({ selectedImageIndex: newIndex });
  };

  render() {
    const { images, selectedImageIndex } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              style={{ width: '317px', cursor: 'pointer' }}
              onClick={() => this.handleImageClick(index)}
            />
          ))}
        </div>
        {selectedImageIndex !== null && (
          <div className='modal'>
            <button onClick={() => this.handleNavigate('prev')} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)' }}>{'<'}</button>
            <button onClick={() => this.handleNavigate('next')} style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>{'>'}</button>
            <button onClick={this.handleCloseModal} style={{ position: 'absolute', top: 10, right: 10 }}>X</button>
            <img
              src={images[selectedImageIndex].urls.regular}
              alt={images[selectedImageIndex].alt_description}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GaleriaImagenes;