import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import AllPostcards from './components/AllPostcards';
import PostcardDetail from './components/PostcardDetail';
import Proyecto from './components/pages/Proyecto';
import Aries from './components/pages/Aries';
import URE from './components/pages/URE';
import Mapa from './components/pages/Mapa';
import Alfredo from './components/pages/Alfredo';
import Creditos from './components/pages/Creditos';
// import Dates from './components/pages/Dates';
import './css/pages.scss';
import './css/content.scss';
import Contacto from './components/pages/Contacto';
import Lista from './components/pages/Lista';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 'Home',
      year: '1960',
      size: 'larger',
      order: 'cronological'
    };
  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    const { page, year, size, order } = this.state;
    return (
      <div>
        <header className="header">
          <Navbar page={page} />
        </header>
        <main>
          <Switch>
            <Route
              key="home"
              exact
              path="/"
              render={() => <Proyecto newPage={() => this.setPage('Proyecto')} page="Proyecto" />}
            />
            <Route
              exact
              path="/proyecto"
              render={() => <Proyecto newPage={() => this.setPage('Proyecto')} page="Proyecto" />}
            />
            <Route
              path="/postal/:id"
              render={() => (
                <PostcardDetail
                  newPage={() => this.setPage('PostalDetalle')} page="PostalDetalle"
                />
              )}
            />
            <Route
              exact
              path="/postales"
              render={() => (
                <AllPostcards
                  filterYear={year}
                  size={size}
                  order={order}
                  newPage={() => this.setPage('Postales')}
                  page="Postales"
                />
              )}
            />
            <Route
              exact
              path="/aries"
              render={() => <Aries newPage={() => this.setPage('Aries')} page="Aries" />}
            />
            <Route
              exact
              path="/ure"
              render={() => <URE newPage={() => this.setPage('URE')} page="URE" />}
            />
            <Route
              exact
              path="/mapa"
              render={() => <Mapa newPage={() => this.setPage('Mapa')} page="Mapa" />}
            />
            <Route
              exact
              path="/lista"
              render={() => <Lista newPage={() => this.setPage('Lista')} page="Lista" />}
            />
            <Route
              exact
              path="/alfredo"
              render={() => <Alfredo newPage={() => this.setPage('Alfredo')} page="Alfredo" />}
            />
            <Route
              exact
              path="/fecha"
              render={() => <AllPostcards newPage={() => this.setPage('Fechas')} page="Fechas" />}
            />
            <Route
              exact
              path="/creditos"
              render={() => <Creditos newPage={() => this.setPage('Creditos')} page="Creditos" />}
            />
            <Route
              exact
              path="/contacto"
              render={() => <Contacto newPage={() => this.setPage('Contacto')} page="Contacto" />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
