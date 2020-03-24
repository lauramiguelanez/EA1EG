import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';

import Navbar from './components/bars/Navbar';
import PostCards from './components/PostCards';
import Landing from './components/Landing';
import Project from './components/pages/Project';
import ProjectURE from './components/pages/ProjectURE';
import LocationMap from './components/LocationMap'

import './css/pages.scss';
import './css/postcards.scss';
import './css/navbar.scss';

const App = () => {
  const [page, setPage] = useState('Home');
  const [search, setSearch] = useState('');

  const { width,height } = useWindowSize();

  const cardRoutes = [
    { route: '/cards', page: 'Cards', exact: true },
    { route: '/search/:search', page: 'Search' },
    { route: '/card/:id', page: 'CardDetail' },
    { route: '/year/:year', page: 'Years' },
    { route: '/year/', page: 'Years', exact: true },
    { route: '/region/:region', page: 'Region' },
    { route: '/region/', page: 'Region', exact: true },
    // { route: '/location', page: 'Map', exact: true }
  ];

  return (
    <div className="app" page={page}>
      <header className="header">
        <Navbar page={page} setPage={setPage} setSearch={setSearch} />
      </header>
      <main className={width < 650 ? 'mobile' : ''}>
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
            exact
            path="/ure"
            render={() => <ProjectURE newPage={() => setPage('URE')} page="URE" />}
          />
          <Route
            exact
            path="/location"
            render={() => <LocationMap newPage={() => setPage('Map')} page="Map" height={height}/>}
          />
          {cardRoutes.map(({ route, page, exact }, i) => {
            const otherProps = { ...exact };
            return (
              <Route
                path={route}
                render={props => (
                  <PostCards
                    key={i}
                    newPage={forcedPage => setPage(forcedPage || page)}
                    page={page}
                    search={search}
                    {...props}
                  />
                )}
                {...otherProps}
              />
            );
          })}
        </Switch>
      </main>
    </div>
  );
};

export default App;
