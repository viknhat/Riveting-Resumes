import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewResume from './resumes/pages/NewResume';
import UserResumes from './resumes/pages/UserResumes';
import UpdateResume from './resumes/pages/UpdateResume';
import Auth from './user/pages/Auth';
import MainNav from './shared/components/Navigation/MainNav';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/resumes" exact>
          <UserResumes />
        </Route>
        <Route path="/resumes/new" exact>
          <NewResume />
        </Route>
        <Route path="/resumes/:resumeId">
          <UpdateResume />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/resumes" exact>
          <UserResumes />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
