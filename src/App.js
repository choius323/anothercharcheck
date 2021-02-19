import React from 'react';
import CheckPage from './views/CheckPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './views/NavBar';
import ResultPage from './views/ResultPage';

function App() {
  return (
    <Router basename="/anothercharcheck">
      <NavBar />
      <Route exact path="/" component={CheckPage} />
      <Route exact path="/result" component={ResultPage} />
    </Router>
  );
}

export default App;
