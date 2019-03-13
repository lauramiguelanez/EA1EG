import React, { Component } from 'react';

class Proyecto extends Component {
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
      <section className='page page-proyecto'>
        <div className='page-title'>Proyecto page</div>
        <div className='text-body'>
          <p>El archivo base del proyecto se compone de una extensa colección de postales QSL producida a lo largo de la trayectoria  como radioaficionado de Alfredo Abella Martín.</p>
          <p>Las tarjetas QSL son postales que las emisoras (tanto de aficionados, como de radiodifusión y otros servicios) envían a vuelta de correo, como respuesta a los informes de recepción (o QSL propias) confirmando una escucha o comunicado bilateral. Además de documentar la escucha con los datos esenciales, las QSL contienen imágenes turísticas, logos, una foto del operador, sus equipos, motivos conmemorativos, paisajes naturales, etc.</p>
          <p>Alfredo  Abella Martín (Ávila, 1923-1992) inició su actividad como radioaficionado tras perder la vista en 1944 en un accidente manipulando explosivos.  A  través de una antena instalada en la casa de su madre, realizó una intensa actividad como radioaficionado (el primero con permiso en la provincia de ávila) contactando con emisoras de todo el mundo.</p>
          <p>La mayor cantidad de las postales del archivo pertenecen a este periodo (1950-1963), que concluye con su cambio de domicilio tras contraer matrimonio y conseguir un trabajo en O.N.C.E.</p>
          <p>Alfredo recuperó el ritmo de conexiones después de los setenta, tras conseguir una antena de mayor alcance y cuando, después de jubilarse, fundó la Asociación de Radioaficionados Invidentes de España (A.R.I.E.S.). </p>
          <p>Alfredo Abella utilizó las postales, a parte de para comunicarse con compañeros y nuevos conocidos,  par certificar las conexiones durante los numerosos concursos que ganó, y con los que consiguió mucha fama dentro de la Unión de Radioaficionados Españoles (U.R.E.)</p>
          <p>El archivo tiene por tanto un enorme valor documental dentro del contexto de la radioafición en España, pero representa también una extensa colección de iconografías y representaciones de todas partes del mundo.</p>
          <p>El archivo se compone de diseños que representan dos realidades políticas y sociales muy diferentes (50s-60s y 80s). En las postales  se reflejan los esfuerzos por sintetizar y traducir identidades y contextos en una época pre-redes sociales en las que la comunicación internacional entre particulares suponía un reto y una excepción. </p>       
        </div>
      </section>
    );
  }
}

export default Proyecto;