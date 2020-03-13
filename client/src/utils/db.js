const cards = db.postcards
  .find()
  .projection({})
  .sort({ _id: -1 })
  .limit(100);

cards.forEach(c => {
  const { _id, imageFront, imageBack, year,continent, country, QTH, indicator } = c;

  const y = year.substring(2, 4);

  const newImageFront = continent.replace(" ","") + "/" + country.replace(" ","") + "/" + QTH.replace(" ","") + "/" + indicator + "-" + y + '-1.jpg';
  const newImageBack = continent.replace(" ","") + "/" + country.replace(" ","") + "/" + QTH.replace(" ","") + "/" + indicator + "-" + y + '-2.jpg';
  //const newImageFront = c.imageFront.replace('-1.jpg', "") + '-' + y + '-1.jpg';
  //const newImageBack = c.imageFront.replace('-1.jpg',"") + '-' + y + '-1.jpg';

  console.log('front back', newImageFront, newImageBack);
  //  continent/country/QTH/indicator-y-1.jpg

  //c.imageFront=

  db.postcards
    .update(
      { _id: _id },
      {
        $set: {
          imageFront: newImageFront,

          imageBack: newImageBack
        }
      }
    )

  return c;
});
