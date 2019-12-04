import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();
class AllPostcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`
    });
    this.imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';
    // this.getPostcards();
    /*  console.log('props', props)
    if(props.filterYear){
      this.getPostcardsByYear(props.filterYear);
    } */
  }

  componentDidMount = () => {
    this.props.newPage();

    const year = this.props.year || this.props.match && this.props.match.params.year;
    this.setState({ year: year });
    console.log('AllPostcards', this.props.match);
    if (year) {
      this.getPostcardsByYear(year);
    } else {
      this.getPostcards();
    }
  };

  getPostcards() {
    let postcards;
    return this.service
      .get('/postcard')
      .then(cards => {
        postcards = cards.data;
        console.log('getAllPostcards',postcards);
        this.setState({ postcards });
      })
      .catch(error => console.log(error));
  }

  getPostcardsByYear(year) {
    console.log('getPostcards');
    let postcards;
    return this.service
      .get(`/year/${year}`)
      .then(cards => {
        postcards = cards.data;
        console.log(postcards);
        this.setState({ postcards, year });
      })
      .catch(error => console.log(error));
  }

  render() {
    let { postcards } = this.state;
    if (postcards) {
      return (
        <section className="page page-years">
          <div className="page-title">1980</div>
          <div className="all-postcards-wrapper">
            {postcards.map((card, i) => {
              return (
                <NavLink key={card._id} className="nav-link" to="/postal/:id">
                  <div className="postcard-thumbnail" />
                </NavLink>
              );
            })}
          </div>
        </section>
      );
    }
    return (
      <section className="page page-years">
        <div className="page-title">1980</div>
        <div className="all-postcards-wrapper">
          {new Array(43).fill(0).map((e, i) => {
            return (
              <NavLink key={i} className="nav-link" to="/postal/:id">
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
