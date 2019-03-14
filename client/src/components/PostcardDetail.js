import React, { Component } from 'react';

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
    return <section />;
  }
}

export default PostcardDetail;


