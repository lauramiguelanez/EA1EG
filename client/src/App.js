import React, { Component } from 'react';
import { Switch, Route /* , BrowserRouter, Router */ } from 'react-router-dom';

import Navbar from './components/Navbar';
import AllPostcards from './components/AllPostcards';
import Landing from './components/Landing';
import PostcardDetail from './components/PostcardDetail';
import Project from './components/pages/Project';
import Aries from './components/pages/Aries';
import ProjectURE from './components/pages/ProjectURE';
import LocationMapCluster from './components/pages/LocationMap';
// import Alfredo from './components/pages/Alfredo';
// import Creditos from './components/pages/Creditos';
// import Contacto from './components/pages/Contacto';
import './css/pages.scss';
import './css/content.scss';
import List from './components/pages/List';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 'Home',
      year: '1960',
      size: 'larger',
      order: 'cronological',
      region: 'España'
    };
  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    const { page, year, size, order, region } = this.state;
    return (
      <div className="app" page={page}>
        <header className="header">
          <Navbar page={page} />
        </header>
        <main>
          <Switch>
            <Route
              key="home"
              exact
              path="/"
              render={() => <Landing newPage={() => this.setPage('Home')} page="Home" />}
            />
            <Route
              exact
              path="/project"
              render={() => <Project newPage={() => this.setPage('Project')} page="Project" />}
            />
            <Route
              path="/card/:id"
              render={(props) => (
                <PostcardDetail
                  newPage={() => this.setPage('CardDetail')}
                  page="CardDetail"
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/cards"
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
              path="/year/:year"
              render={props => (
                <AllPostcards newPage={() => this.setPage('Years')} page="Years" {...props} />
              )}
            />

            <Route
              exact
              path="/ure"
              render={() => <ProjectURE newPage={() => this.setPage('URE')} page="URE" />}
            />
            <Route
              exact
              path="/location"
              render={() => (
                <LocationMapCluster
                  newPage={() => this.setPage('LocationMap')}
                  page="LocationMap"
                />
              )}
            />
            <Route
              exact
              path="/region/:region"
              render={(props) => (
                <AllPostcards newPage={() => this.setPage('List')} page="List" {...props}/>
              )}
            />
            <Route
              exact
              path="/region"
              render={() => <AllPostcards newPage={() => this.setPage('List')} page="List" />}
            />
            {/*
              <Route
              exact
              path="/aries"
              render={() => <Aries newPage={() => this.setPage('Aries')} page="Aries" />}
             />
              <Route
               exact
               path="/alfredo"
               render={() => <Alfredo newPage={() => this.setPage('Alfredo')} page="Alfredo" />}
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
            */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
