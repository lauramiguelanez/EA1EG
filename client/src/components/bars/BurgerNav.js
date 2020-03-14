import React, { useState } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';
import Burger from './elements/Burger';
import SearchBar from './elements/SearchBar';

const BurgerNav = ({ page, setPage, setSearch }) => {
  const [openBurger, setOpenBurger] = useState(true);
  return (
    <React.Fragment>
      {/* <NavLink className="nav-link" to="/">
        <img src="/img/logo.png" alt="EA1EG" className="logoSvg"></img>
      </NavLink> */}
      <button type="button" onClick={() => setOpenBurger(!openBurger)}>
        <Burger />
      </button>

      {openBurger ? (
        <nav className={`bar-years`} role="navigation">
          <div className="" id="top-nav">
            <div className="">
              <NavLink className="link-line" to="/location">
                Map
              </NavLink>
              <NavLink className="link-line" to="/region">
                List
              </NavLink>
              <NavLink className="nav-link" to="/year/1970">
                Year
              </NavLink>
              <NavLink className="nav-link" to="/project">
                Project
              </NavLink>
              <NavLink className="nav-link" to="/ure">
                URE
              </NavLink>
              <NavLink className="nav-link" to="/cards">
                Search
                <SearchBar setSearch={setSearch} />
              </NavLink>
            </div>
          </div>
        </nav>
      ) : null}
    </React.Fragment>
  );
};

export default BurgerNav;
