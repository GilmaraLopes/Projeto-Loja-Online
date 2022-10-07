import React, { Component } from 'react';

export default class CarrinhoDeCompras extends Component {
  state = { carrinho: '' };

  render() {
    const { carrinho } = this.state;
    if (carrinho.length === 0) {
      return (
        <div>
          {/* <p>Seu carrinho está vazio</p> */}
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      );
    }
  }
}
