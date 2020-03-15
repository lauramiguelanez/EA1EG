import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Search = props => {
  const { setSearch } = props;
  const [searchInput, setSearchInput] = useState('');
  const onChange = e => {
    // console.log('Search', e.target.value);
    setSearchInput(e.target.value);
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      console.log('Search:', searchInput);
      setSearch(searchInput);
      const url = `/search/${searchInput}`
      return props.history.push(url);
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

export default withRouter(Search);
