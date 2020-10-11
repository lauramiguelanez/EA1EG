import React, { useEffect } from 'react';
import animateScrollTo from 'animated-scroll-to';

const Project = ({ newPage, t }) => {
  useEffect(() => {
    newPage();
    animateScrollTo(0);
  }, []);


  const getContent = (key) => {
    const items = t(key).split('\n');
    return items.map(item => {
      if (item.includes('hola@vendedoresdehumo.com')) {
        const s = item.split('hola@vendedoresdehumo.com');
        return (<p>{s[0]} <a href="mailto:hola@vendedoresdehumo.com">hola@vendedoresdehumo.com</a> {s[1]}</p>)
      }
      if (item.includes('wikipedia(REF#1)')){
        const s = item.split('wikipedia(REF#1)');
        return (<p>{s[0]} <a href="https://es.wikipedia.org/wiki/Diexismo">wikipedia</a> {s[1]}</p>)
      }
      return (<p>{item}</p>);
    })
  }

  const projectImgs = [
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/EA1EG-1.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/EA1EG-2.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/EA1EG-3.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441402/EA1EG/pages/EA1EG-4.png',
  ];

  return (
    <section className="page page-project">
      <div className="wrapper-text-column">
        <div className="text-body-column">
          {getContent('projectText')}
        </div>
        <div className="text-body-column">
          <div className="page-image-wrapper">
            {projectImgs.map((image, i) => (
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

export default Project;
