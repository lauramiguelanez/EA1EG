import React, { useState } from 'react';
import { Switch, Route /* , BrowserRouter, Router */ } from 'react-router-dom';

import Navbar from './components/bars/Navbar';
import AllPostcards from './components/AllPostcards';
import Landing from './components/Landing';
import PostcardDetail from './components/PostcardDetail';
import Project from './components/pages/Project';
import ProjectURE from './components/pages/ProjectURE';
import LocationMapCluster from './components/LocationMap';
import './css/pages.scss';
import './css/content.scss';
import List from './components/pages/List';

const App = () => {
  const [page, setPage] = useState('Home');
  const [size, setSize] = useState('Large');
  const [order, setOrder] = useState('Large');

  
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
            render={() => <Landing newPage={() => setPage('Home')} page="Home" />}
          />
          <Route
            exact
            path="/project"
            render={() => <Project newPage={() => setPage('Project')} page="Project" />}
          />
          <Route
            path="/card/:id"
            render={props => (
              <PostcardDetail newPage={() => setPage('CardDetail')} page="CardDetail" {...props} />
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
                newPage={() => setPage('Postales')}
                page="Postales"
              />
            )}
          />
          <Route
            exact
            path="/year/:year"
            render={props => (
              <AllPostcards newPage={() => setPage('Years')} page="Years" {...props} />
            )}
          />

          <Route
            exact
            path="/ure"
            render={() => <ProjectURE newPage={() => setPage('URE')} page="URE" />}
          />
          <Route
            exact
            path="/location"
            render={() => (
              <LocationMapCluster newPage={() => setPage('LocationMap')} page="LocationMap" />
            )}
          />
          <Route
            exact
            path="/region/:region"
            render={props => (
              <AllPostcards newPage={() => setPage('List')} page="List" {...props} />
            )}
          />
          <Route
            exact
            path="/region"
            render={() => <AllPostcards newPage={() => setPage('List')} page="List" />}
          />
          
        </Switch>
      </main>
    </div>
  );
};

export default App;
