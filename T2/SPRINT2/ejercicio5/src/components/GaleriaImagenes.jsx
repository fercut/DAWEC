import React, { Component } from 'react';

class GaleriaImagenes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImageIndex: null,
      page: 1,
      imagesPerPage: 24,
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchImages();
    this.addScrollListener();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      // Reinicia la galería y la página cuando se realiza una nueva búsqueda
      this.setState({ images: [], page: 1, selectedImageIndex: null }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const { page, imagesPerPage, searchTerm } = this.state;
    const key = 'xNB7nkQULYt5HE2ewFWcDyBzjb61OE-MC2kIsW2LEVc';
    let apiUrl = `https://api.unsplash.com/photos?per_page=${imagesPerPage}&page=${page}&client_id=${key}`;

    if (searchTerm) {
      apiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=${imagesPerPage}&page=${page}&client_id=${key}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const newImages = searchTerm ? data.results : data;

        // Verifica si hay más imágenes disponibles
        if (newImages.length > 0) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...newImages],
            selectedImageIndex: null,
            page: prevState.page + 1,
          }));
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  };

  addScrollListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const { page, imagesPerPage, searchTerm } = this.state;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Carga más imágenes al final del grid
    if (windowHeight + scrollTop === documentHeight) {
      this.fetchImages();
    }
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

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.setState({ images: [], page: 1, selectedImageIndex: null }, () => {
      this.fetchImages();
    });
  };

  render() {
    const { images, selectedImageIndex, searchTerm } = this.state;

    return (
      <div>
        <header>
          <h1>BUSCADOR DE IMAGENES</h1>
          <input
            type="text"
            placeholder="Buscar imágenes..."
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap' }} className='images'>
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
              style={{ maxWidth: '80%', maxHeight: '80%' }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GaleriaImagenes;
