import React, { Component } from 'react';
import { /* Link, BrowserRouter,  */ NavLink } from 'react-router-dom';
import '../../css/navbar.scss';

const { window } = global;
const { innerWidth, innerHeight } = window;
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, hover: false };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    //onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const { page } = this.props;
    const { hover } = this.state;

    const style = {
      width: page === 'Years' ? `${innerWidth - 100}px` : '100vw'
    };

    if (hover) {
      console.log('hover');
    } else {
      console.log('no hover');
    }
    return (
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
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
              >
                <NavLink className="link-line" to="/location">
                  Location
                </NavLink>
                {hover ? (
                  <React.Fragment>
                    <NavLink className="link-line" to="/location">
                      Map
                    </NavLink>
                    <NavLink className="link-line" to="/region">
                      List
                    </NavLink>
                  </React.Fragment>
                ) : null}
              </div>
              <NavLink className="nav-link" to="/year/1970">
                Year
              </NavLink>
            </div>

            <div className="nav-group nav-group-main">
              <NavLink className="nav-link" to="/project">
                Project
              </NavLink>
              <NavLink className="nav-link" to="/ure">
                URE
              </NavLink>
            </div>

            <div className="nav-group nav-group-secondary">
              <NavLink className="nav-link" to="/buscar">
                Search
              </NavLink>
            </div>

            <div className="nav-group"></div>
          </div>
        </div>
        
      </nav>
    );
  }
}
