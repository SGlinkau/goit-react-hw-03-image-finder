import React, { useState } from 'react';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    props.handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    props.handleClear();
  };

  return (
    <header>
      <form onSubmit={handleSearch}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
          required
        />
        <button type="button" onClick={handleClear}>
          Clear search results
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
