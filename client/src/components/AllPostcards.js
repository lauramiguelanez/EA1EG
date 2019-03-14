import React, { Component } from 'react';

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
          return <div className='postcard-thumbnail'></div>;
        })}
        </div>
      </section>
    );
  }
}

export default AllPostcards;
