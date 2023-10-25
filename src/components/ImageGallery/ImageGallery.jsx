import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

function ImageGallery({ isEmptySearchQuery, isLoading, images, openModal }) {
  return (
    <section className="gallery">
      {isEmptySearchQuery ? (
        <p>Please provide input above!</p>
      ) : isLoading ? (
        <RotatingLines type="Oval" color="#00BFFF" height={100} width={100} />
      ) : (
        <ul>
          {images.length > 0 ? (
            images.map((image, index) => (
              <li className="gallery-item" key={index}>
                <img
                  src={image.previewURL}
                  alt={image.tags}
                  onClick={() => openModal(image.largeImageURL)}
                />
              </li>
            ))
          ) : (
            <p>Enter what pictures you would like to see</p>
          )}
        </ul>
      )}
    </section>
  );
}

export default ImageGallery;
