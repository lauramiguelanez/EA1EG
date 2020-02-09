import jsonPostcards from './jsonPostcards';

const cards = [];

jsonPostcards.forEach(
  ({ continent, country, city, region, indicator, QTH, year, lat, lng, imageFront, imageBack }) => {
    const front = imageFront.replace(' ', '');
    const back = imageBack.replace(' ', '');

    const card = {
      continent,
      country,
      city,
      region,
      indicator,
      QTH,
      year,
      location: { lat, lng },
      imageFront: front,
      imageBack: back,
      old: false,
    };
    cards.push(card);


    db.postcards.insert(card)
  }
);
