import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
  };

  // SPRAWDZENIE CZY KOMPONENT PIXABAY SIĘ ZAMONTOWAŁ
  componentDidMount() {
    this.getImagesFromPixabay();
  }

  // POBRANIE OBRAZÓW Z API PIXABAY
  getImagesFromPixabay = async () => {
    try {
      const apiKey = '40228040-e1deee2d1dbd5acbce038e379';
      const searchQuery = this.state.searchQuery;
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo`;

      const response = await axios.get(apiUrl);

      if (response.data.hits) {
        const images = response.data.hits;
        this.setState({ images });
      }
    } catch (error) {
      console.error('Błąd podczas pobierania obrazów z Pixabay', error);
    }
  };

  // WARTOŚĆ JAKICH OBRAZÓW SZUKAMY W INPUT
  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  // WYSZUKIWANIE OBRAZÓW NA BAZIE HASŁA W INPUT
  handleSearch = event => {
    event.preventDefault();
    this.getImagesFromPixabay();
  };

  render() {
    return (
      <>
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
          </form>
        </header>
        <section className="gallery">
          <ul>
            {this.state.images.map((image, index) => (
              <li className="gallery-item" key={index}>
                <img src={image.previewURL} alt={image.tags} />
              </li>
            ))}
          </ul>
        </section>

        <section></section>
      </>
    );
  }
}
