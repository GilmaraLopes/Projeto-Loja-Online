import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,

} from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ PaginaPrincipal } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
