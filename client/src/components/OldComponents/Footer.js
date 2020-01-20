import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';
// import '../css/navbar.scss';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    
    return (
      <nav className="nav-style" id="bottom-nav" role="navigation">
      </nav>
    );
  }
}