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
import './css/pages.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 'Home'
    };
  }

  render() {
    return (
      <div>
        <header className="header">
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route
              key="home"
              exact
              path="/"
              render={() => (
                <Proyecto
                  newPage={() => {
                    this.setState({ page: 'Proyecto' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/proyecto"
              render={() => (
                <Proyecto
                  newPage={() => {
                    this.setState({ page: 'Proyecto' });
                  }}
                />
              )}
            />
            <Route
              path="/postcard/:id"
              render={() => (
                <PostcardDetail
                  newPage={() => {
                    this.setState({ page: 'PostcardDetail' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/postcard"
              render={() => (
                <AllPostcards
                  newPage={() => {
                    this.setState({ page: 'AllPostcards' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/aries"
              render={() => (
                <Aries
                  newPage={() => {
                    this.setState({ page: 'Aries' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/ure"
              render={() => (
                <URE
                  newPage={() => {
                    this.setState({ page: 'URE' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/mapa"
              render={() => (
                <Mapa
                  newPage={() => {
                    this.setState({ page: 'Mapa' });
                  }}
                />
              )}
            />
            <Route
              exact
              path="/Alfredo"
              render={() => (
                <Alfredo
                  newPage={() => {
                    this.setState({ page: 'Alfredo' });
                  }}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
