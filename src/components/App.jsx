import React, { Component } from 'react';

// https://pixabay.com/api/?q=cat&page=1&key=40228040-e1deee2d1dbd5acbce038e379&image_type=photo&orientation=horizontal&per_page=12

export const App = () => {
  return (
    <>
      <header>
        <form>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      <section className="gallery">
        <ul>
          <li class="gallery-item">
            <img src="" alt="" />
          </li>
        </ul>
      </section>
    </>
  );
};
