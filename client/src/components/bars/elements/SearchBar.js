import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Search = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const onChange = e => {
    // console.log('Search', e.target.value);
    setSearchInput(e.target.value);
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
    </div>
  );
};

export default Search;
