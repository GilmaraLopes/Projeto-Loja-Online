import { Component } from 'react';

export default class CarrinhoDeCompras extends Component {
  state = { carrinho: [] };

  componentDidMount() {
    const carrinhoJson = JSON.parse(localStorage.getItem('carrinhoLocalStorage'));
    if (carrinhoJson !== null) {
      this.setState({
        carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
      });
    }
  }

  render() {
    const { carrinho } = this.state;
    return (
      carrinho.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
        : (
          <div>
            { carrinho.length > 0 && carrinho.map((item, i) => (

              <div key={ i }>
                <p data-testid="shopping-cart-product-name">
                  { item.title }
                </p>
                <p data-testid="shopping-cart-product-quantity">
                  1
                </p>
              </div>
            )) }
          </div>)
    );
  }
}
