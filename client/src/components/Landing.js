import React, { Component } from 'react';
import '../css/landing.scss';

const { window } = global;

const { innerWidth, innerHeight } = window;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      landingImgStyle: new Array(9).fill({})
    };

    this.generateStyles=this.generateStyles.bind(this)

    // TODO: meter on window resize
  }

  componentDidMount = () => {
    this.props.newPage();
    this.generateStyles();
  };

  generateStyles() {
    const styles = [];
    for (let i = 0; i < 9; i++) {
      const style = {
        position: 'absolute',
        zIndex: `${10 + i}`,
        width: `${innerWidth * 0.25 + Math.random() * 100}px`,
        top: Math.random() * innerHeight * 0.75 + 0.1 * innerHeight,
        left: Math.random() * innerWidth * 0.75
      };
      styles.push(style);
    }

    this.setState({
      landingImgStyles: styles
    });
  }

  render() {
    const images = [
      'ea1eg-2019-01',
      'ea1eg-2019-02',
      'ea1eg-2019-03',
      'ea1eg-2019-04',
      'ea1eg-2019-05',
      'ea1eg-2019-06',
      'ea1eg-2019-07',
      'ea1eg-2019-08',
      'ea1eg-2019-09'
    ];

    console.log('innerWidth', innerWidth, 'innerHeight', innerHeight);

    const { landingImgStyles } = this.state;

    return (
      <section className="landingSection">
        <img src={`/img/landing/ea1eg.svg`} alt="EA1EG" id="bigLetters"></img>
        {images.map((image, i) => {
          return (
            <img
              src={`/img/landing/${image}.png`}
              alt={image}
              style={landingImgStyles && landingImgStyles[i]}
              onClick={this.generateStyles}
            ></img>
          );
        })}
      </section>
    );
  }
}

export default Home;
