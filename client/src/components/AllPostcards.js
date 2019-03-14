import React, { Component } from 'react';
import { Link, BrowserRouter, NavLink } from 'react-router-dom';
class AllPostcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount = () => {
    this.props.newPage();
  };

  render() {
    return (
      <section className="page page-years">
        <div className="page-title">1980</div>
        <div className="all-postcards-wrapper">
          {new Array(43).fill(0).map((e, i) => {
            return (
              <NavLink className="nav-link" to="/postal/:id">
                <div className="postcard-thumbnail" />
              </NavLink>
            );
          })}
        </div>
      </section>
    );
  }
}

export default AllPostcards;
