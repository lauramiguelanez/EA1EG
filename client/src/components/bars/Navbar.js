import React, { Component } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize'

import SearchBar from './elements/SearchBar';
import BurgerNav from './BurgerNav';
import URE from '../pages/ProjectURE';

const { window } = global;
const { innerWidth, innerHeight } = window;

// const windowSize = useWindowSize();

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, hoverLocation: false, hoverSearch: false };

    this.toggleHoverLocation = this.toggleHoverLocation.bind(this);
    this.toggleHoverSearch = this.toggleHoverSearch.bind(this);
  }

  toggleHoverLocation() {
    this.setState({ hoverLocation: !this.state.hoverLocation });
  }

  toggleHoverSearch() {
    this.setState({ hoverSearch: !this.state.hoverSearch });
  }

  render() {
    const { page, setPage, setSearch } = this.props;
    const { hoverLocation, hoverSearch } = this.state;

    const selectedStyle = {
      textDecoration: 'line-through'
    };

    const style = {
      width: page === 'Years' ? `${innerWidth - 100}px` : '100%'
      // backgroundColor:  page ===  'Home' || page ===  'URE'  ? 'none' : 'rgba(255, 255,255, 1)'
    };
    if (page === 'URE') {
      style.backgroundColor = '#ccc8b8';
    } else if (page === 'Project') {
      style.backgroundColor = '#d4ebff';
    } else if (page !== 'Home' && page !== 'Project' && page !== 'URE') {
      style.backgroundColor = 'white';
    }

    if (hoverLocation) {
      console.log('hoverLocation');
    } else {
      console.log('no hoverLocation');
    }

    return innerWidth > 600 ? (
      <nav className={`nav-style bar-${page}`} role="navigation" style={style}>
        <div className="nav-row-wrapper" id="top-nav">
          <div className="nav-row">
            <div className="nav-group logo">
              <NavLink className="nav-link" to="/">
                <img src="/img/logo.png" alt="EA1EG" className="logoSvg"></img>
              </NavLink>
            </div>

            <div className="nav-group site-title">
              <div
                className="nav-link"
                onMouseEnter={this.toggleHoverLocation}
                onMouseLeave={this.toggleHoverLocation}
              >
                <NavLink
                  className="link-line"
                  to="/location"
                  style={page === 'Map' || page === 'Region' ? selectedStyle : {}}
                >
                  Location
                </NavLink>
                {hoverLocation ? (
                  <React.Fragment>
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
                  </React.Fragment>
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
              onMouseEnter={this.toggleHoverSearch}
              onMouseLeave={this.toggleHoverSearch}
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
  }
}
