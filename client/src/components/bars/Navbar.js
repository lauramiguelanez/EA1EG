import React, { useState, useEffect, Fragment } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';
import useWindowScroll from '../../hooks/useWindowScroll';
import SearchBar from './elements/SearchBar';
import BurgerNav from './BurgerNav';

const Navbar = (props) => {
  const { page, setPage, setSearch, t, i18n } = props;
  const [hoverLocation, toggleHoverLocation] = useState(false);
  const [hoverAbout, toggleHoverAbout] = useState(false);
  const [hoverSearch, toggleHoverSearch] = useState(false);

  const { scrollY } = useWindowScroll();
  const { width } = useWindowSize();

  const selectedStyle = {
    textDecoration: 'line-through',
  };
  const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

  return width > 650 ? (
    <nav className={`nav-style bar-${page}`} role="navigation">
      <div className="nav-row-wrapper" id="top-nav">
        <div className={`nav-row${page ? ` nav-${page.toLowerCase()}` : ''}`}>
          <div className="nav-group logo">
            <NavLink className="nav-link menuItem" to="/">
              {scrollY <= 50 ? (
                <img src="/img/logo.png" alt="EA1EG" className="logoSvg" />
              ) : (
                <img src="/img/logoSimple.png" alt="EA1EG" className="logoSvg" />
              )}
            </NavLink>
          </div>

          <div className="nav-group site-title">
            <div
              className="nav-link menuItem"
              onMouseEnter={() => toggleHoverLocation(true)}
              onMouseLeave={() => toggleHoverLocation(false)}
            >
              <NavLink
                className="link-line"
                to="/location"
                style={page === 'Map' || page === 'Region' ? selectedStyle : {}}
              >
                {t('location')}
              </NavLink>
              {hoverLocation ? (
                <Fragment>
                  <NavLink
                    className="link-line"
                    to="/location"
                    style={page === 'Map' ? selectedStyle : {}}
                  >
                    {t('map')}
                  </NavLink>
                  <NavLink
                    className="link-line"
                    to="/region"
                    style={page === 'Region' ? selectedStyle : {}}
                  >
                    {t('list')}
                  </NavLink>
                </Fragment>
              ) : null}
            </div>
            <NavLink
              className="nav-link menuItem"
              to="/year/1960"
              style={page === 'Year' ? selectedStyle : {}}
            >
              {t('year')}
            </NavLink>
          </div>

          <div className="nav-group">
            <NavLink
              className="nav-link menuItem"
              to="/project"
              style={page === 'Project' ? selectedStyle : {}}
            >
              {t('project')}
            </NavLink>

            <div
              className="nav-link menuItem"
              onMouseEnter={() => toggleHoverAbout(true)}
              onMouseLeave={() => toggleHoverAbout(false)}
            >
              <NavLink
                className="link-line"
                to="/about"
                style={page === 'About' ? selectedStyle : {}}
              >
                {t('about')}
              </NavLink>
              {hoverAbout ? (
                <Fragment>
                  <NavLink
                    className="link-line"
                    to="/about"
                    style={page === 'About' ? selectedStyle : {}}
                  >
                    EA1EG
                  </NavLink>
                  <NavLink
                    className="link-line"
                    to="/qsl"
                    style={page === 'QSL' ? selectedStyle : {}}
                  >
                    QSL
                  </NavLink>
                </Fragment>
              ) : null}
            </div>
          </div>

          <div
            className="nav-group"
            onMouseEnter={() => toggleHoverSearch(true)}
            onMouseLeave={() => toggleHoverSearch(false)}
          >
            <NavLink
              className="nav-link menuItem search-link"
              to="/cards"
              style={page === 'Search' ? selectedStyle : {}}
            >
              {t('search')}
              {hoverSearch ? <SearchBar setSearch={setSearch} /> : null}
            </NavLink>
          </div>

          <div className="nav-lang">
            <span
              onClick={() => i18n.changeLanguage('en')}
              style={getCurrentLng() === 'en' ? selectedStyle : {}}
            >
              EN
            </span>
            <span
              onClick={() => i18n.changeLanguage('es')}
              style={getCurrentLng() === 'es' ? selectedStyle : {}}
            >
              ES
            </span>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <BurgerNav page={page} setPage={setPage} setSearch={setSearch} />
  );
};

export default Navbar;
