import React, { useState, useEffect, Fragment } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';

import SearchBar from './elements/SearchBar';
import BurgerNav from './BurgerNav';
import URE from '../pages/ProjectURE';

const Navbar = props => {
  const { page, setPage, setSearch } = props;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [hoverLocation, toggleHoverLocation] = useState(false);
  const [hoverSearch, toggleHoverSearch] = useState(false);

  const { width } = useWindowSize();

  const selectedStyle = {
    textDecoration: 'line-through'
  };

  const style = {
    width: page === 'Years' ? `${width - 100}px` : '100%'
    // backgroundColor:  page ===  'Home' || page ===  'URE'  ? 'none' : 'rgba(255, 255,255, 1)'
  };
  if (page === 'URE') {
    style.backgroundColor = '#ccc8b8';
  } else if (page === 'Project') {
    style.backgroundColor = '#d4ebff';
  } else if (page !== 'Home' && page !== 'Project' && page !== 'URE') {
    style.backgroundColor = 'white';
  }

  return width > 650 ? (
    <nav className={`nav-style bar-${page}`} role="navigation" style={style}>
      <div className="nav-row-wrapper" id="top-nav">
        <div
          className={`nav-row${
            page === 'URE' ? ' nav-URE' : page === 'Project' ? ' nav-project' : page === 'Home' ? ' nav-home' : ''
          }`}
        >
          <div className="nav-group logo">
            <NavLink className="nav-link" to="/">
              <img src="/img/logo.png" alt="EA1EG" className="logoSvg"></img>
            </NavLink>
          </div>

          <div className="nav-group site-title">
            <div
              className="nav-link"
              onMouseEnter={() => toggleHoverLocation(true)}
              onMouseLeave={() => toggleHoverLocation(false)}
            >
              <NavLink
                className="link-line"
                to="/location"
                style={page === 'Map' || page === 'Region' ? selectedStyle : {}}
              >
                Location
              </NavLink>
              {hoverLocation ? (
                <Fragment>
                  <NavLink
                    className="link-line"
                    to="/location"
                    style={page === 'Map' ? selectedStyle : {}}
                  >
                    Map
                  </NavLink>
                  <NavLink
                    className="link-line"
                    to="/region"
                    style={page === 'Region' ? selectedStyle : {}}
                  >
                    List
                  </NavLink>
                </Fragment>
              ) : null}
            </div>
            <NavLink
              className="nav-link"
              to="/year/1960"
              style={page === 'Year' ? selectedStyle : {}}
            >
              Year
            </NavLink>
          </div>

          <div className="nav-group">
            <NavLink
              className="nav-link"
              to="/project"
              style={page === 'Project' ? selectedStyle : {}}
            >
              Project
            </NavLink>
            <NavLink className="nav-link" to="/ure" style={page === 'URE' ? selectedStyle : {}}>
              URE
            </NavLink>
          </div>

          <div
            className="nav-group"
            onMouseEnter={() => toggleHoverSearch(true)}
            onMouseLeave={() => toggleHoverSearch(false)}
          >
            <NavLink
              className="nav-link search-link"
              to="/cards"
              style={page === 'Search' ? selectedStyle : {}}
            >
              Search
              {hoverSearch ? <SearchBar setSearch={setSearch} /> : null}
            </NavLink>
          </div>

          <div className="nav-group"></div>
        </div>
      </div>
    </nav>
  ) : (
    <BurgerNav page={page} setPage={setPage} setSearch={setSearch} />
  );
};

export default Navbar;
