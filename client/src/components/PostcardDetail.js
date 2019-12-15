import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
class PostcardDetail extends Component {
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
        <div className="postcard-data">
          <p>QSL</p>
          <p>LUGAR, LUGAR</p>
          <p>AÑO</p>
        </div>
        <div className="postcard-wrapper">
          <div className="postcard-img" />
          <div className="postcard-img" />
        </div>
        <div className="next-postcards-wrapper">
          {new Array(43).fill(0).map((e, i) => {
            return (
              <NavLink className="nav-link" to="/card/:id">
                <div className="postcard-thumbnail" />
              </NavLink>
            );
          })}
        </div>
      </section>
    );
  }
}

export default PostcardDetail;
