import React, { useEffect } from 'react';

const Project = ({ newPage }) => {
  useEffect(() => {
    newPage();
  }, []);

  return (
    <section className="page page-project">
      {/* <div className="page-title">Proyecto page</div> */}
      <div className="wrapper-text-column">
        <div className="text-body-column">
          <p>
            Entre 1953 y 1983 un radioaficionado de la provincia de Ávila recibió en su buzón más de
            6.800 postales QSL, confirmando el contacto radiofónico establecido con remitentes de
            más de 70 países de todo el mundo.
          </p>
        </div>
        <div className="text-body-column">
          <p>
            Alfredo Abella Martin nació en Avila el 16 de septiembre de 1923, siendo el pequeño de
            cuatro hermanos de una familia de nivel cultural alto, dado que tanto su padre como su
            madre ejercían como inspectores de primera enseñanza en la provincia de Avila. Se quedó
            huérfano de padre siendo muy pequeño. Realizo estudios primarios y de bachillerato en
            Avila e inicio estudios en Valladolid de la carrera de Comercio.
          </p>
          <p>
            En 1944, manipulando una espoleta de una bomba lanzada por la aviación durante la guerra
            civil, pierde la visión en los dos ojos y de varios dedos de ambas manos.
          </p>
          <p>
            A finales de los años 40, por consejo de un amigo,entra en contacto con la radioafición
            y en 1950 obtiene, previo el examen correspondiente, el carnet de radioaficionado,
            siendo la primera persona que consigue este permiso en la provincia de Avila.
          </p>
          <p>
            Desde ese momentó hasta octubre de 1963, cuando contrae matrimonio con Carmen Santacana,
            desarrolla una intensa actividad como radioaficionado, durante la que logra establecer
            contacto con radioaficionados de todas las esquinas del planeta. Dada la dificultad del
            idioma en muchos casos, los contactos se limitaban a informar de la localización de sus
            emisoras y de las características de estas como frecuencia y alcance.
          </p>
          <p>
            A partir 1973, se instala de forma definitiva en un nuevo apartamento donde instala una
            nueva antena de mucho más alcance y desde donde, tras su jubilación en 1988, realiza
            otra intensa actividad como radioaficionado.
          </p>
          <p>Muere el 16 de marzo de 1992.</p>
        </div>
      </div>
    </section>
  );
};

export default Project;
