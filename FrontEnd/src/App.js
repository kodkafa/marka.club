import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Routes from './routes.js';
import {ScrollToTop} from "./components";

const App = () =>
  <Router>
    <ScrollToTop/>
    <Switch>
      <Route path="/" component={Routes}/>
    </Switch>
  </Router>;

export default App;
