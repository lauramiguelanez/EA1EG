import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';

export default class YearBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  render() {
    const { page, setYear } = this.props;

    return (
      <div className="year-wrapper" /* id="contextual-nav" */>
        <div className="year-column">
          <div className="year-wrapper-v bar-years">
            {new Array(43).fill(0).map((e, i) => {
              const year = 1950 + i;
              return (
                <NavLink
                  className="menu-years-v"
                  to={`/year/${year}`}
                  onClick={() => setYear(year)}
                >
                  {year}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
