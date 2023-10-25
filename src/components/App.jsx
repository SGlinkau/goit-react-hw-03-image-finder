import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    isLoading: false,
    isSearched: false,
    currentPage: 1,
    isModalOpen: false,
    selectedImage: null,
  };

  // SPRAWDZENIE CZY KOMPONENT PIXABAY SIĘ ZAMONTOWAŁ
  componentDidMount() {
    if (this.state.isSearched) {
      this.getImagesFromPixabay();
    }

    Modal.setAppElement('body');
  }

  // POBRANIE OBRAZÓW Z API PIXABAY
  getImagesFromPixabay = async () => {
    this.setState({ isLoading: true });
    try {
      const apiKey = '40228040-e1deee2d1dbd5acbce038e379';
      const searchQuery = this.state.searchQuery;
      const page = this.state.currentPage;
      const perPage = 12;
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`;

      const response = await axios.get(apiUrl);

      if (response.data.hits) {
        const newImages = response.data.hits;
        const images = [...this.state.images, ...newImages];
        this.setState({ images, isLoading: false, isSearched: true });
      }
    } catch (error) {
      console.error('Błąd podczas pobierania obrazów z Pixabay', error);
      this.setState({ isLoading: false, isSearched: true });
    }
  };

  // WARTOŚĆ JAKICH OBRAZÓW SZUKAMY W INPUT
  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value, isSearched: false });
  };

  // WYSZUKIWANIE OBRAZÓW NA BAZIE HASŁA W INPUT
  handleSearch = event => {
    event.preventDefault();
    this.setState({ images: [], isSearched: true, currentPage: 1 });
    this.getImagesFromPixabay();
  };

  // SZUKANIE WIĘKSZEJ ILOŚC OBRAZÓW PO WCIŚNIĘCIU PRZYCISKU
  handleLoadMore = () => {
    if (this.state.searchQuery.trim() === '') {
      this.setState({ isEmptySearchQuery: true });
    } else {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        isEmptySearchQuery: false,
      }));
      this.getImagesFromPixabay();
    }
  };

  // CZYSZCZENIE GALERII
  handleClear = () => {
    this.setState({
      images: [],
      searchQuery: '',
      isSearched: false,
      currentPage: 1,
    });
  };

  // OTWARCIE OKNA MODALNEGO
  openModal = image => {
    this.setState({ isModalOpen: true, selectedImage: image });
  };

  // ZAMKNIĘCIE OKNA MODALNEGO
  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null });
  };

  render() {
    return (
      <>
        {/* SEARCH BAR */}
        <header>
          <form onSubmit={this.handleSearch}>
            <button type="submit">
              <span>Search</span>
            </button>
            <input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
              required
            />
            <button type="button" onClick={this.handleClear}>
              Clear search results
            </button>
          </form>
        </header>
        {/* IMAGES GALLERY */}
        <section className="gallery">
          {this.state.isEmptySearchQuery ? (
            <p>Please provide input above!</p>
          ) : this.state.isLoading ? (
            <RotatingLines
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            />
          ) : (
            <ul>
              {this.state.images.length > 0 ? (
                this.state.images.map((image, index) => (
                  <li className="gallery-item" key={index}>
                    <img
                      src={image.previewURL}
                      alt={image.tags}
                      onClick={() => this.openModal(image.largeImageURL)}
                    />
                  </li>
                ))
              ) : (
                <p>Enter what pictures you would like to see</p>
              )}
            </ul>
          )}
        </section>

        {/* BUTTON LOAD MORE */}
        <button type="button" onClick={this.handleLoadMore}>
          Load more!
        </button>

        {/* TUTAJ BĘDZIE MODAL */}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Image Modal"
        >
          {this.state.selectedImage && (
            <img src={this.state.selectedImage} alt="Selected" />
          )}
        </Modal>
      </>
    );
  }
}
