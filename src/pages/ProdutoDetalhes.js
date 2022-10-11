import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProdutoDetalhes extends Component {
  state = {
    produtoId: '',
    carrinho: [],
    email: '',
    rating: '',
    comment: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const urlString = 17;
    const pathId = pathname.substring(urlString);
    const products = await getProductById(pathId);

    if (JSON.parse(localStorage.getItem('carrinhoLocalStorage') !== null)) {
      this.setState({
        carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
      });
    }

    this.setState({
      produtoId: products,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  addCarrinhoAsync = () => {
    const { carrinho } = this.state;
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
  };

  addCarrinho = (item) => {
    item.quantidade = 1;
    this.setState((prevState) => ({
      carrinho: [...prevState.carrinho, item],
    }), this.addCarrinhoAsync);
  };

  enableBtn = () => {
    const { history } = this.props;
    history.push('/carrinhodecompras');
  };

  render() {
    const { produtoId, email, comment, rating } = this.state;
    console.log(rating);
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
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addCarrinho(produtoId) }

        >
          Comprar

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
        <form>
          <label htmlFor="emailInput">
            Email
            <input
              onChange={ this.handleChange }
              name="email"
              data-testid="product-detail-email"
              id="emailInput"
              type="text"
              value={ email }
            />
          </label>
          <label htmlFor="commentForm">
            Comentario
            <textarea
              onChange={ this.handleChange }
              name="comment"
              data-testid="product-detail-evaluation"
              id="commentForm"
              type="text"
              value={ comment }
            />
          </label>

          <label htmlFor="nota1">
            {' '}
            <input
              onClick={ () => {
                this.setState({
                  rating: 1,
                });
              } }
              data-testid="1-rating"
              type="radio"
              id="nota1"
              name="rating"

            />
            1
          </label>
          <label htmlFor="nota2">
            {' '}
            <input
              onClick={ () => {
                this.setState({
                  rating: 2,
                });
              } }
              data-testid="2-rating"
              type="radio"
              id="nota2"
              name="rating"

            />
            2
          </label>
          <label htmlFor="nota3">
            {' '}
            <input
              onClick={ () => {
                this.setState({
                  rating: 3,
                });
              } }
              data-testid="3-rating"
              type="radio"
              id="nota3"
              name="rating"

            />
            3
          </label>
          <label htmlFor="nota4">
            {' '}
            <input
              onClick={ () => {
                this.setState({
                  rating: 4,
                });
              } }
              data-testid="4-rating"
              type="radio"
              id="nota4"
              name="rating"

            />
            4
          </label>
          <label htmlFor="nota5">
            {' '}
            <input
              onClick={ () => {
                this.setState({
                  rating: 5,
                });
              } }
              data-testid="5-rating"
              type="radio"
              id="nota5"
              name="rating"

            />
            5
          </label>
          <button type="submit" data-testid="submit-review-btn">Enviar</button>
        </form>
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
