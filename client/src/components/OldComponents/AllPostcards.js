import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
import axios from 'axios';
import YearBar from '../bars/YearBar';
import List from '../pages/List';

const { window } = global;
const { innerWidth, innerHeight } = window;

require('dotenv').config();
class AllPostcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      region: null
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`
    });
    this.imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

    this.setYear = this.setYear.bind(this);
    this.setRegion = this.setRegion.bind(this);
  }

  componentDidMount = () => {
    this.props.newPage();
    const { page, match, year, region } = this.props;

    if (page === 'Years') {
      const selectedYear = year || (match && match.params.year);
      this.setState({ selectedYear });
      this.getPostcardsByYear(selectedYear);
    } else if (page === 'LocationList') {
      const selectedRegion = region || (match && match.params.region);
      this.setState({ selectedRegion });
      this.getPostcardsByRegion(selectedRegion);
    } else {
      this.getPostcards();
    }
  };

  setRegion(region) {
    this.setState({ region });
  }

  getPostcards() {
    let postcards;
    return this.service
      .get('/postcard')
      .then(cards => {
        postcards = cards.data;
        console.log('getAllPostcards', postcards);
        this.setState({ postcards });
      })
      .catch(error => console.log(error));
  }

  getPostcardsByRegion(region) {
    console.log('getPostcardsByYear');
    let postcards;
    return this.service
      .get(`/region/${region}`)
      .then(cards => {
        postcards = cards.data;
        console.log(postcards);
        this.setState({ postcards, region });
      })
      .catch(error => console.log(error));
  }

  getPostcardsByYear(year) {
    console.log('getPostcardsByYear');
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

  setYear(year) {
    this.setState({ year });
    this.getPostcardsByYear(year);
  }

  render() {
    let { postcards, year } = this.state;
    const { page } = this.props;

    const style = {
      width: page === 'Years' ? `${innerWidth - 100}px` : '100vw'
    };

    return (
      <section className="page page-years" style={style}>
        {page === 'List' ? <List setRegion={this.setRegion}></List> : null}
        <div className="columns-wrapper ">
          {postcards
            ? postcards.map((card, i) => {
                return (
                  <div className="column">
                    <NavLink key={card._id} className="nav-link postcard" to={`/card/${card._id}`}>
                      <div className="postcard-thumbnail">
                        {card.imageFront ? (
                          <img src={`${this.imageUrl}${card.imageFront}`} alt={card.indicator} />
                        ) : (
                          <h3 className="postcard-thumbnail card-thumbnail-name">
                            {card.indicator}
                          </h3>
                        )}
                      </div>
                    </NavLink>
                  </div>
                );
              })
            : new Array(13).fill(0).map((e, i) => {
                return (
                  <div className="column">
                    <NavLink key={i} className="nav-link postcard" to="/postal/:id">
                      <div className="postcard-thumbnail" />
                    </NavLink>
                  </div>
                );
              })}
        </div>
        {page === 'Years' ? <YearBar page={page} year={year} setYear={this.setYear} /> : null}
      </section>
    );
  }
}

export default AllPostcards;
