import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';

export default class ContextualBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    return (
      <div className="nav-row-wrapper" id="contextual-nav">
        <div className="nav-row">
          <p>Contextual</p>
        </div>
      </div>
    );
  }
}
