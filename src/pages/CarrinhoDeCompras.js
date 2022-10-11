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

  addItem = (item) => {
    const { carrinho } = this.state;
    item.quantidade += 1;
    const novoCarrinho = [...carrinho];
    this.setState(() => ({
      carrinho: novoCarrinho,
    }), localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho)));
  };

  decreaseItem = (item) => {
    const { carrinho } = this.state;
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      const carrinho2 = carrinho;
      this.setState(() => ({
        carrinho: carrinho2,
      }), localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho)));
    }
  };

  removeItem = (item) => {
    const { carrinho } = this.state;
    const novoCarrinho = carrinho.filter((e) => e.id !== item.id);
    this.setState(() => ({
      carrinho: novoCarrinho,
    }), localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho)));
  };

  render() {
    const { carrinho } = this.state;
    return (
      carrinho.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
        : (
          <div>
            { carrinho.length > 0 && carrinho.map((item, i) => (
              <>
                <div key={ i }>
                  <p data-testid="shopping-cart-product-name">
                    { item.title }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    {item.quantidade}
                  </p>
                </div>
                <button
                  onClick={ () => this.addItem(item) }
                  type="button"
                  data-testid="product-increase-quantity"
                >
                  +

                </button>
                <button
                  onClick={ () => this.decreaseItem(item) }
                  type="button"
                  data-testid="product-decrease-quantity"
                >
                  -

                </button>
                <button
                  onClick={ () => this.removeItem(item) }
                  type="button"
                  data-testid="remove-product"
                >
                  Remover Item

                </button>
              </>
            )) }
          </div>)
    );
  }
}
