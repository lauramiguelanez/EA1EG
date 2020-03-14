import React, { useState,Fragment } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';
import Burger from './elements/Burger';
import SearchBar from './elements/SearchBar';
import '../../css/burgernav.scss';

const BurgerNav = ({ page, setPage, setSearch }) => {
  const [openBurger, setOpenBurger] = useState(false);
  return (
    <div className={`burgernav-father${openBurger ? ' openBurger' : ''}`}>
      {/* <NavLink className="nav-link" to="/">
        <img src="/img/logo.png" alt="EA1EG" className="logoSvg"></img>
      </NavLink> */}
      <button type="button" onClick={() => setOpenBurger(!openBurger)}>
        {openBurger ? <img className="burgernav-image" src="/img/logo.png" alt="EA1EG"></img> : <Burger />}
      </button>

      {openBurger ? (
        <nav className="nav-style burgernav-wrapper" role="navigation">
          <div className="" id="top-burgernav">
            <div className="burgernav-links">
              <NavLink className="nav-link burger-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link burger-link" to="/location">
                Map
              </NavLink>
              <NavLink className="nav-link burger-link" to="/region">
                List
              </NavLink>
              <NavLink className="nav-link burger-link" to="/year/1960">
                Year
              </NavLink>
              <NavLink className="nav-link burger-link" to="/project">
                Project
              </NavLink>
              <NavLink className="nav-link burger-link" to="/ure">
                URE
              </NavLink>
              <NavLink className="nav-link burger-link" to="/cards">
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
