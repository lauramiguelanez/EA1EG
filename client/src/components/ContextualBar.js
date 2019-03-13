import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';

export default class ContextualBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    const { currentPage } = this.props;
    let contextualMenu = <div />;

    console.log(currentPage);
    /* switch (currentPage) {
      case 'Fechas':
        console.log('currentPage', currentPage);
        contextualMenu = (
          <div>
            {new Array(43).map(e => (
              <p>{1900 + 10 * e}</p>
            ))}
          </div>
        );
        break;
      case 'URE':
        console.log('currentPage', currentPage);
        break;
      case 'Mapa':
        console.log('currentPage', currentPage);
        break;
      case 'Alfredo':
        console.log('currentPage', currentPage);
        break;
      case 'Aries':
        console.log('currentPage', currentPage);
        break;
      case 'Proyecto':
        console.log('currentPage', currentPage);
        break;
      case 'Postales':
        console.log('currentPage', currentPage);
        break;
      case 'PostalDetalle':
        console.log('currentPage', currentPage);
        break;
      default:
        contextualMenu = <div />;
    } */

    return (
      <div className="nav-row-wrapper" id="contextual-nav">
        <div className="nav-row">
          {/* contextualMenu */}
          <div className="contextual-wrapper">
            {new Array(43).fill(0).map((e, i) => {
              console.log('e', e);
              return <p className='menu-years'>{1950 + i}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
