import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';

export default class ContextualBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    const { page } = this.props;
    let contextualMenu = <div />;

    const projectMenu = (
      <div className="contextual-wrapper-h bar-proyecto">
        <div className="nav-group" />
        <div className="nav-group" />
        <div className="nav-group">
          <NavLink className="nav-link" to="/">
            EA1EG
          </NavLink>
          <NavLink className="nav-link" to="/aries">
            ARIES
          </NavLink>
          <NavLink className="nav-link" to="/ure">
            URE
          </NavLink>
        </div>
        <div className="nav-group">
          <NavLink className="nav-link" to="/proyecto">
            Proyecto
          </NavLink>
          <NavLink className="nav-link" to="/contacto">
            Contacto
          </NavLink>
          <NavLink className="nav-link" to="/creditos">
            Créditos
          </NavLink>
        </div>
      </div>
    );

    const mapaMenu = (
      <div className="contextual-wrapper-h bar-location">
        <div className="nav-group" />
        <div className="nav-group" />
        <div className="nav-group">
          <NavLink className="nav-link" to="/location">
            Lugar
          </NavLink>
          <NavLink className="nav-link" to="/lista">
            Lista
          </NavLink>
        </div>
      </div>
    );

    const filtersMenu = (
      <div className="contextual-wrapper-h bar-filters">
        <div className="nav-group" />
        <div className="nav-group" />
        <div className="nav-group">
          <a className="nav-link">Tamaño</a>
          <a className="nav-link">Orden</a>
        </div>
        <div className="nav-group">
          <a className="nav-link">Reducir Ampliar</a>
          <a className="nav-link">Cronológico</a>
          <a className="nav-link">Geográfico</a>
          <a className="nav-link">Visitado</a>
        </div>
      </div>
    );

    switch (page) {
      case 'Years':
        contextualMenu = (
          <div className="contextual-wrapper-v bar-years">
            {new Array(43).fill(0).map((e, i) => {
              return (
                <NavLink className="menu-years" to={`/year/${1950 + i}`}>
                  {1950 + i}
                </NavLink>
              );
            })}
          </div>
        );
        break;
      case 'URE':
        contextualMenu = projectMenu;
        break;
      case 'LocationMap':
        contextualMenu = mapaMenu;
        break;
      case 'Lista':
        contextualMenu = mapaMenu;
        break;
      case 'Alfredo':
        console.log('page', page);
        break;
      case 'Aries':
        contextualMenu = projectMenu;
        break;
      case 'Proyecto':
        contextualMenu = projectMenu;
        break;
      case 'Creditos':
        contextualMenu = projectMenu;
        break;
      case 'Contacto':
        contextualMenu = projectMenu;
        break;
      case 'Postales':
        contextualMenu = filtersMenu;
        break;
      case 'PostalDetalle':
        contextualMenu = filtersMenu;
        break;
      default:
        contextualMenu = <div />;
    }

    return (
      <div className="nav-row-wrapper" id="contextual-nav">
        <div className="nav-row">{contextualMenu}</div>
      </div>
    );
  }
}
