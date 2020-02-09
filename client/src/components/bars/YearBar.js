import React from 'react';
import { NavLink } from 'react-router-dom';

const YearBar = ({ page, setYear, year }) => {
  const selectedStyle = {
    textDecoration: 'line-through'
  };

  return (
    <div className="year-wrapper">
      <div className="year-column">
        <div className="year-wrapper-v bar-years">
          {new Array(44).fill(0).map((e, i) => {
            const y = 1950 + i;
            return (
              <NavLink
                key={y}
                className="menu-years-v"
                to={`/year/${y}`}
                onClick={() => setYear(y)}
                style={y === year ? selectedStyle : {}}
              >
                {y}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default YearBar;
