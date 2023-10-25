import React from 'react';

function LoadMoreButton({ handleLoadMore }) {
  return (
    <button type="button" onClick={handleLoadMore}>
      Load more!
    </button>
  );
}

export default LoadMoreButton;
