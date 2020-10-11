import React, { useEffect } from 'react';
import animateScrollTo from 'animated-scroll-to';

const About = ({ newPage, t }) => {
  useEffect(() => {
    newPage();
    animateScrollTo(0);
  }, []);

  const getContent = (key) => {
    const items = t(key).split('\n');
    return items.map(item => {
      return (<p>{item}</p>);
    })
  }

  const images = [
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/PROJECT-1.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/PROJECT-2.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441403/EA1EG/pages/PROJECT-3.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441403/EA1EG/pages/PROJECT-4.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441403/EA1EG/pages/PROJECT-5.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/PROJECT-6.png'
  ];

  return (
    <section className="page page-about">
      <div className="wrapper-text-column">
        <div className="text-body-column">
          {getContent('aboutText')}
        </div>
        <div className="text-body-column">
          <div className="page-image-wrapper">
            {images.map((image, i) => (
              <div className="page-image">
                <span>{`0${i + 1}`}</span>
                <img src={image} alt={`0${i + 1}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
