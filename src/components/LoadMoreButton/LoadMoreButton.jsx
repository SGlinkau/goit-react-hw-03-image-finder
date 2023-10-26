import React from 'react';
import CSS from './LoadMoreButton.module.css';

function LoadMoreButton({ handleLoadMore }) {
  return (
    <button className={CSS.loaderButton} type="button" onClick={handleLoadMore}>
      Load more!
    </button>
  );
}

export default LoadMoreButton;
