import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,

} from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal';
import './App.css';
import CarrinhoDeCompras from './pages/CarrinhoDeCompras';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ PaginaPrincipal } />
        <Route path="/carrinhodecompras" component={ CarrinhoDeCompras } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
