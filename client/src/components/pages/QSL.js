import React, { useEffect } from 'react';
import animateScrollTo from 'animated-scroll-to';

const QSL = ({ newPage, t }) => {
  useEffect(() => {
    newPage();
    animateScrollTo(0);
  }, []);

  const getContent = (key) => {
    const items = t(key).split('\n');
    return items.map(item => {
      if (item.includes('UNION DE RADIOAFICIONADOS ESPAÑOLES (U.R.E)')){
        const s = item.split('UNION DE RADIOAFICIONADOS ESPAÑOLES (U.R.E)');
        return (
          <p>{s[0]} <a href="https://www.ure.es/">UNION DE RADIOAFICIONADOS ESPAÑOLES (U.R.E)</a>
          {s[1]}</p>
        )
      }
      if (item.includes('The American Radio Relay League (ARRL).')){
        const s = item.split('The American Radio Relay League (ARRL).');
        return (
          <p>{s[0]} <a href="http://www.arrl.org/">The American Radio Relay League (ARRL).</a>
          {s[1]}</p>
        )
      }
      if (item.includes('Traducción española:')){
        const s = item.split('Traducción española:');
        return (
          <p>{s[0]} <a href="http://www.digigrup.org/radio/quees.htm#:~:text=El%20art%C3%ADculo%201%2C%20apartado%203.34,t%C3%A9cnicas%20llevadas%20a%20cabo%20por)">Traducción española:</a>
          {s[1]}</p>
        )
      }
      return (<p>{item}</p>);
    })
  }

  const images = [
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-1.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-2.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-3.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-4.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-5.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441404/EA1EG/pages/QSL-6.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441405/EA1EG/pages/QSL-7.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441405/EA1EG/pages/QSL-8.png',
    'https://res.cloudinary.com/dmtbzrye8/image/upload/v1602441405/EA1EG/pages/QSL-9.png'
  ];

  const orientation = ['h', 'h', 'h', 'h', 'h', 'v', 'h', 'h', 'v'];

  const getFootNotes = (key) => {
    const items = t(key).split('\n');
    return (
      <ol>
        {items.map((item, i) => (
          <li>{item}</li>
        ))}
      </ol>
    );
  };

  return (
    <section className="page page-qsl">
      <div className="wrapper-text-column">
        <div className="text-body-column">
          {getContent('qslText1')}
          <div className="text-body-notes">
            {getContent('qslNotes1')}
          </div>
          {getContent('qslText2')}
          <div className="page-footnotes">
            {t('imgs')}
            {getFootNotes('qslNotes')}
          </div>
        </div>
        <div className="text-body-column">
          <div className="page-image-wrapper">
            {images.map((image, i) => (
              <div className="page-image">
                <span>{`0${i + 1}`}</span>
                <img className={orientation[i]} src={image} alt={`0${i + 1}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QSL;
