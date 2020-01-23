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
    <input
      type="text"
      onChange={onChange}
      onKeyDown={handleEnter}
      placeholder="QSL, country, year..."
    />
  );
};

export default Search;
