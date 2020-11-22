import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Burger from './elements/Burger';
import SearchBar from './elements/SearchBar';
import '../../css/burgernav.scss';

const BurgerNav = ({ page, setPage, setSearch }) => {
  const [openBurger, setOpenBurger] = useState(false);

  const linkClass =
    page === 'URE'
      ? ' burgernav-URE'
      : page === 'Project'
      ? ' burgernav-project'
      : page === 'Home'
      ? ' burgernav-home'
      : '';
  return (
    <div
      className={`burgernav-father${openBurger ? ' openBurger' : ''}${
        page === 'URE'
          ? ' burgernav-URE'
          : page === 'Project'
          ? ' burgernav-project'
          : page === 'Home'
          ? ' burgernav-home'
          : ''
      }`}
    >
      <button type="button" onClick={() => setOpenBurger(!openBurger)}>
        {openBurger ? (
          <img className="burgernav-image" src="/img/logo.png" alt="EA1EG"></img>
        ) : (
          <Burger />
        )}
      </button>
      {openBurger ? (
        <nav className="nav-style burgernav-wrapper" role="navigation">
          <div className="" id="top-burgernav">
            <div className="burgernav-links">
              <NavLink className={'nav-link burger-link' + linkClass} to="/">
                Home
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/location">
                Map
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/region">
                List
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/year/1960">
                Year
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/project">
                Project
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/ure">
                URE
              </NavLink>
              <NavLink className={'nav-link burger-link' + linkClass} to="/cards">
                Search
                <SearchBar setSearch={setSearch} />
              </NavLink>
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
};

export default BurgerNav;
