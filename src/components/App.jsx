import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    isLoading: false,
    isSearched: false,
    currentPage: 1,
  };

  // SPRAWDZENIE CZY KOMPONENT PIXABAY SIĘ ZAMONTOWAŁ
  componentDidMount() {
    if (this.state.isSearched) {
      this.getImagesFromPixabay();
    }
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
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
    this.getImagesFromPixabay();
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
            />
            <button type="button">clear</button>
          </form>
        </header>
        {/* IMAGES GALLERY */}
        <section className="gallery">
          {this.state.isLoading ? (
            <p>Proszę czekać, trwa ładowanie obrazów...</p>
          ) : (
            <ul>
              {this.state.images.length > 0 ? (
                this.state.images.map((image, index) => (
                  <li className="gallery-item" key={index}>
                    <img src={image.previewURL} alt={image.tags} />
                  </li>
                ))
              ) : (
                <p>Proszę podać wartość szukanej frazy</p>
              )}
            </ul>
          )}
        </section>

        {/* BUTTON LOAD MORE */}
        <button type="button" onClick={this.handleLoadMore}>
          Load more!
        </button>

        {/* TUTAJ BĘDZIE MODAL */}
      </>
    );
  }
}