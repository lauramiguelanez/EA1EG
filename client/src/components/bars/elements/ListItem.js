import React from 'react';
import { NavLink } from 'react-router-dom';

const ListItem = ({array, selectedItem, setItem}) => {
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
        <li styles={c.name === selectedItem ? selectedStyle : {}}>{c.name.toUpperCase()}</li>
      </NavLink>
    ))}
  </ul>
</div>;
};

export default ListItem;
