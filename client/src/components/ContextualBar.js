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

    switch (page) {
      case 'Fechas':
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
      case 'Mapa':
        console.log('page', page);
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
      case 'Postales':
        console.log('page', page);
        break;
      case 'PostalDetalle':
        console.log('page', page);
        break;
      default:
        contextualMenu = <div />;
    }

    return (
      <div className="nav-row-wrapper" id="contextual-nav">
        <div className="nav-row">
          {contextualMenu}
        </div>
      </div>
    );
  }
}
