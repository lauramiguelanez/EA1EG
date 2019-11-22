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
    const { page } = this.props;
    return (
      <nav className="nav-style" role="navigation">
        <div className="nav-row-wrapper" id="top-nav">
          <div className="nav-row">
            <div className="nav-group logo">
              <NavLink className="nav-link" to="/">
                Logo
              </NavLink>
            </div>
            <div className="nav-group site-title">
              <NavLink className="nav-link" to="/alfredo">
                Atlas Visual Alfredo Abella
              </NavLink>
            </div>
            <div className="nav-group nav-group-main">
              <NavLink className="nav-link" to="/postales">
                Archivo
              </NavLink>
              <NavLink className="nav-link" to="/location">
                Lugar
              </NavLink>
              <NavLink className="nav-link" to="/fecha">
                Año
              </NavLink>
            </div>
            <div className="nav-group nav-group-secondary">
              <NavLink className="nav-link" to="/buscar">
                Buscar
              </NavLink>
              <NavLink className="nav-link" to="/proyecto">
                Proyecto
              </NavLink>
            </div>
          </div>
        </div>
        <ContextualBar page={page} />
      </nav>
    );
  }
}
