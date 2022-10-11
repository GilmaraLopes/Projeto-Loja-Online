import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class PaginaPrincipal extends React.Component {
  state = {
    pesquisa: '',
    categoriaID: '',
    categorias: [],
    itensLoja: [],
    mostrarItens: false,
    carrinho: [],
  };

  async componentDidMount() {
    this.setState({ categorias: await getCategories() });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  enableBtn = () => {
    const { history } = this.props;
    history.push('/carrinhodecompras');
  };

  renderizaItens = async () => {
    const { categoriaID, pesquisa } = this.state;
    const resultadoPesquisa = await
    getProductsFromCategoryAndQuery(categoriaID, pesquisa);
    this.setState({
      itensLoja: resultadoPesquisa.results,
      mostrarItens: true,
    });
  };

  clickCategoria = (item) => {
    this.setState({ categoriaID: item }, () => {
      this.renderizaItens();
    });
  };

  addCarrinhoAsync = () => {
    const { carrinho } = this.state;
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
  };

  addCarrinho = (item) => {
    this.setState((prevState) => ({
      carrinho: [...prevState.carrinho, item],
    }), this.addCarrinhoAsync);
  };

  render() {
    const { pesquisa, categorias, itensLoja, mostrarItens } = this.state;
    return (
      <>
        <div>
          <input
            data-testid="query-input"
            value={ pesquisa }
            name="pesquisa"
            onChange={ this.handleChange }
            type="text"
          />
          <button
            onClick={ this.renderizaItens }
            type="button"
            data-testid="query-button"
          >
            Pesquisar
          </button>
          <div>
            <button
              data-testid="shopping-cart-button"
              type="button"
              name="btCarrinho"
              onClick={ this.enableBtn }
            >
              Carrinho
            </button>
          </div>
        </div>
        {categorias.map((item) => (
          <button
            onClick={ () => this.clickCategoria(item.id) }
            data-testid="category"
            name={ item.name }
            type="button"
            key={ item.id }
          >
            {item.name}
          </button>
        ))}
        {itensLoja.length > 1 && mostrarItens === true
          ? itensLoja.map((item) => (
            <>
              <Link
                className="lista-produtos"
                key={ item.id }
                to={ `/produtodetalhes/${item.id}` }
                data-testid="product-detail-link"
              >
                <div data-testid="product">
                  {' '}
                  <p>{item.title}</p>
                  <img alt="Produto" src={ item.thumbnail } />
                  <p>{item.price}</p>
                </div>

              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addCarrinho(item) }
              >
                Comprar

              </button>
            </>
          )) : (
            <p>Nenhum produto foi encontrado</p>
          )}

        {pesquisa.length === 0 ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          <p />
        )}
      </>
    );
  }
}

PaginaPrincipal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PaginaPrincipal;
