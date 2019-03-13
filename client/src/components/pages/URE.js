import React, { Component } from 'react';

class URE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount = () => {
    //this.props.newPage();
  };

  render() {
    return (
      <section className='page page-ure'>
        <div>URE page</div>
      </section>
    );
  }
}

export default URE;
