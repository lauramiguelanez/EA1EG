import React, { useState } from 'react';
import { Switch, Route /* , BrowserRouter, Router */ } from 'react-router-dom';

import Navbar from './components/bars/Navbar';
import PostCards from './components/PostCards';
import Landing from './components/Landing';
import Project from './components/pages/Project';
import ProjectURE from './components/pages/ProjectURE';
import './css/pages.scss';
import './css/content.scss';

const App = () => {
  const [page, setPage] = useState('Home');
  const [size, setSize] = useState('Large');
  const [order, setOrder] = useState('Large');

  const cardRoutes = [
    { route: '/cards', page: 'Cards', exact: true },
    { route: '/card/:id', page: 'CardDetail' },
    { route: '/year/:year', page: 'Years' },
    { route: '/year/', page: 'Years', exact: true },
    { route: '/region/:region', page: 'Region' },
    { route: '/region/', page: 'Region', exact: true },
    { route: '/location', page: 'Map', exact: true }
  ];

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
            exact
            path="/ure"
            render={() => <ProjectURE newPage={() => setPage('URE')} page="URE" />}
          />
          {cardRoutes.map(({ route, page, exact }) => {
            const otherProps = { ...exact };
            return (
              <Route
                path={route}
                size={size}
                order={order}
                render={props => <PostCards newPage={() => setPage(page)} page={page} {...props} />}
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
