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

  funcQuantidade = (item) => {
    const { carrinho } = this.state;
    const carrinhoID = [];
    carrinho.map((item1) => carrinhoID.push(item1.id));
    let count = 0;
    for (let i = 0; i < carrinhoID.length; i = +1) {
      if (item[i] === carrinhoID[i]) {
        count = +1;
      }
    }
    return count;
  };

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
                  { () => this.funcQuantidade(item.id) }
                </p>
              </div>
            )) }
          </div>)
    );
  }
}
