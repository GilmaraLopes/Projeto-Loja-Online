import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProdutoDetalhes extends Component {
  state = {
    produtoId: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const urlString = 17;
    const pathId = pathname.substring(urlString);
    console.log(pathId);
    const products = await getProductById(pathId);
    this.setState({
      produtoId: products,
    });
  }

  enableBtn = () => {
    const { history } = this.props;
    history.push('/carrinhodecompras');
  };

  render() {
    const { produtoId } = this.state;

    return (

      <div>
        <Link to="/CarrinhoDeCompras" data-testid="product-detail-link">
          <h3 data-testid="product-detail-name">{produtoId.title}</h3>
          <div data-testid="product-detail-image">

            <img alt="Produto" src={ produtoId.thumbnail } />
          </div>
          <p data-testid="product-detail-price">{produtoId.price}</p>

        </Link>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.enableBtn }
        >
          Carrinho

        </button>
        {' '}
        <div>
          {' '}
          <Link to="/">
            {' '}
            <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="voltar" />
            {' '}
          </Link>
          {' '}
        </div>

      </div>
    );
  }
}

ProdutoDetalhes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.string,
  }).isRequired,
};
