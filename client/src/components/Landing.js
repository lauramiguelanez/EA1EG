import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import '../css/landing.scss';

const images = [
  'ea1eg-2019-01',
  'ea1eg-2019-02',
  'ea1eg-2019-03',
  'ea1eg-2019-04',
  'ea1eg-2019-05',
  'ea1eg-2019-06',
  'ea1eg-2019-07',
  'ea1eg-2019-08',
  'ea1eg-2019-09',
  'ea1eg-2019-10'
];

const Landing = props => {
  const { newPage } = props;
  const [landingImgStyles, setStyles] = useState(new Array(9).fill({}));
  const { width, height } = useWindowSize();

  const goToRandom = () => {
    const url = `/cards`
    return props.history.push(url);
  }

  const generateStyles = () => {
    const styles = [];

    const maxWidth = width * 0.23;
    const maxLeft = width - maxWidth;
    const minTop = 90;
    const maxTop = height - minTop - (2 * maxWidth) / 3;

    for (let i = 0; i < 10; i++) {
      const style = {
        position: 'absolute',
        zIndex: `${10 + Math.floor(Math.random() * Math.floor(10))}`,
        width: `${maxWidth + Math.random() * 100}px`,
        top: Math.random() * maxTop + minTop,
        left: Math.random() * maxLeft
      };
      styles.push(style);
    }
    setStyles(styles);
  };

  useEffect(() => {
    newPage();
    generateStyles();
  }, [width, height]);

  return (
    <section className="landingSection" onClick={generateStyles}>
      <img src={`/img/landing/ea1eg.svg`} alt="EA1EG" id="bigLetters"></img>
      {images.map((image, i) => {
        return (
          <img
            src={`/img/landing/${image}.png`}
            alt={image}
            style={landingImgStyles && landingImgStyles[i]}
            onClick={i === 9 ? goToRandom: generateStyles}
          />
        );
      })}
    </section>
  );
};

export default withRouter(Landing);
