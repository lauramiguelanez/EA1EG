import React, { Component } from 'react';

class Alfredo extends Component {
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
      <section className='page page-alfredo'>
        <div className='page-title'>Alfredo page</div>
        <div className='text-body'>
          <p>Alfredo Abella Martin nació en Avila el 16 de septiembre de 1923, siendo el pequeño de cuatro hermanos de una familia de nivel cultural alto, dado que tanto su padre como su madre  ejercían como inspectores de primera enseñanza en la provincia de Avila. Se quedó huérfano de padre siendo muy pequeño. Realizo estudios primarios y de bachillerato en Avila e inicio estudios en Valladolid de la carrera de Comercio.</p>
          <p>En 1944, tras encontrar la espoleta de una   bomba lanzada por la aviación durante la guerra civil, la llevo a su casa e intentando manipularla,  le explotó en las manos, perdiendo  la visión en los dos ojos  y de varios dedos de ambas manos.</p>
          <p>Este hecho hizo que se replanteara totalmente su vida, y sin ninguna duda fue determinante para su posterior afición a la radio afición.</p>
          <p>A finales de los años 40, por consejo de su amigo Julio Lopez Morales, hijo del pintor Jose Maria Lopez Mezquita, que veraneaba habitualmente en Avila, y , le enseña el manejo de su emisora de radioaficionado, con el fin de realizar una nueva  actividad lúdica que pudiera efectuar  en su nueva condición de invidente.</p>
          <p>Alfredo se entusiasma con esta nueva actividad que le abre nuevos caminos, y en el año 1950 obtiene, previo el examen correspondiente,  el carnet de radioaficionado , siendo la primera persona que consiguió  este permiso en la provincia de Avila, y se hace miembro de la URE.</p>
          <p>Compra su primera emisora de radio que instala con la correspondiente antena en su domicilio familiar de la calle dos de mayo nº 6 de Avila.</p>
          <p>Desde allí y desde finales de 1950 hasta octubre de 1963, en que se casa con Carmen Santacana Martin,  desarrolla una intensa actividad como radioaficionado, durante la que logra establecer contacto con radioaficionados de todas las provincias españolas y las entonces denominadas plazas de soberanía Africanas. Igualmente consigue contactos   con todos los países de Europa, destacando por el gran número de contactos los que realiza con Alemania, Italia, Francia, Portugal y Gran Bretaña. Dentro de Europa hay que destacar también el gran número de contactos que realiza con radioaficionados de países de la entonces denominada URSS, con la dificultad que podría suponer realizar un contacto entre un país en plena autarquía de Franco con otro de régimen plenamente comunista.  Lógicamente en este caso los contactos, dado la dificultad del idioma, se limitaban a informar de la localización de sus emisoras y de las características de estas como frecuencia y alcance. Igualmente mantuvo contacto con todos los países de América, donde destacan el número de contactos que realizo con EEUU, donde realizo contactos con radioaficionados  de  la mayoría de Estados integrados en este país americano. También realiza contactos  con radioaficionados australianos y en Asia contacta  con radioaficionados principalmente Japoneses  Chinos e indios.</p>
          <p>En la década de 1950 aprueba por oposición su ingreso en la ONCE, siendo nombrado delegado de esta organización en Avila, puesto en que permanecerá hasta su jubilación en 1988, pese a que le ofrecieron en varias ocasiones desempeñar puestos directivos de la organización en Madrid.</p>
          <p>Desde 1965 hasta 1985 realizo a su vez las labores de administrador gerente del colegio de educación especial Santa Teresa de Martiherrero de Avila, labor por la que no permitió percibir nunca una sola peseta, dado que estas funciones las realizaba en su calidad de su compromiso católico con la sociedad, labores en la que participó activamente durante gran parte de su vida desde que asumió su incapacidad de invidente.</p>
          <p>Entre 1963 y 1973, al trasladarse de casa por su matrimonio a una casa alquilada y al desarrollar gran parte de su actividad a la puesta en marcha de colegio de educación especial referido disminuye significativamente su actividad como radioaficionado aunque sigue utilizando su equipo en casa de su madre de forma intermitente.</p>
          <p>A partir 1973, se instala de forma definitiva en un piso encima de donde vivía su madre, lo que le permite utilizar en principio la antena que tenía en casa de su madre en la nueva emisora que adquiere en esa época en su casa, no obstante posteriormente instala un nueva antena de mucha mayor potencia y alcance, que le permite ya en los años 80, y sobre todo a partir de 1988, en que se jubila, iniciar una nueva e intensa actividad como radioaficionado que se centra fundamentalmente  en le creación de ARIES, acrónimo de la asociación de radioaficionados invidentes españoles, asociación de la que fue fundador y presidente hasta su muerte y en la organización y participación en numerosos concursos de perros guía sobre todo con motivo del cincuentenario de la ONCE en 1988 .</p>
          <p>Muere en 16 de marzo de 1992, de un tumor cerebral que detecto su gravedad el día en que se dio cuenta que no podía manejar su emisora, una de las pasiones de su vida.</p>
          </div>
      </section>
    );
  }
}

export default Alfredo;