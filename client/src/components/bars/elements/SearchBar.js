import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Search = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const onChange = ({ value }) => {
    setSearchInput(value);
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      console.log('Search:', searchInput);
      setSearch(searchInput);
    }
  };
  return (
    <div className="searchField">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={handleEnter}
        placeholder="QSL, country, year..."
        className="searchInput"
      />
      {/* <label for="name" className="searchLabel">QSL, country, year...</label> */}
    </div>
  );
};

export default Search;


