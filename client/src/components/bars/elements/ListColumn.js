import React from 'react';
import { NavLink } from 'react-router-dom';

const ListColumn = ({array, selectedItem, setItem, t}) => {
  const selectedStyle = {
    textDecoration: 'line-through'
  };
  return  <div className="column">
  <ul className="list">
    {array.map(c => (
      <NavLink
        key={c.name}
        className="nav-link"
        to={`/region/${c.name}`}
        onClick={() => setItem(c)}
      >
        <li className="list-upper" styles={c.name === selectedItem ? selectedStyle : {}}>{t(c.name.toLowerCase())}</li>
      </NavLink>
    ))}
  </ul>
</div>;
};

export default ListColumn;
