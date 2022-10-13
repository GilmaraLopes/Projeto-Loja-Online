import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,

} from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Checkout from './pages/Checkout';
import './App.css';
import CarrinhoDeCompras from './pages/CarrinhoDeCompras';
import ProdutoDetalhes from './pages/ProdutoDetalhes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ PaginaPrincipal } />
        <Route path="/carrinhodecompras" component={ CarrinhoDeCompras } />
        <Route path="/produtodetalhes" component={ ProdutoDetalhes } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
