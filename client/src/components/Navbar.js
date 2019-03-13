import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';
import '../css/navbar.scss';
import ContextualBar from './ContextualBar';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    return (
      <nav className="nav-style" role="navigation">
        <div className="nav-row-wrapper" id="top-nav">
          <div className="nav-row">
            <div className="nav-group logo">Logo</div>
            <div className="nav-group site-title">Atlas Visual Alfredo Abella</div>
            <div className="nav-group nav-group-main">
              <NavLink className="nav-link" to="/about">
                Archivo
              </NavLink>
              <NavLink className="nav-link" to="/">
                Lugar
              </NavLink>
              <NavLink className="nav-link" to="/">
                Año
              </NavLink>
            </div>
            <div className="nav-group nav-group-secondary">
              <NavLink className="nav-link" to="/about">
                Buscar
              </NavLink>
              <NavLink className="nav-link" to="/">
                Proyecto
              </NavLink>
            </div>
          </div>
        </div>
        <ContextualBar />
      </nav>
    );
  }
}
