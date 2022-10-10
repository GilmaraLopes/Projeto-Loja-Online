import { Component } from 'react';

export default class CarrinhoDeCompras extends Component {
  state = { carrinho: [] };

  componentDidMount() {
    this.setState({
      carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
    });
  }

  funcQuantidade = (item) => {
    const { carrinho } = this.state;
    // const carrinhoId = carrinho.map((item1) => item1.id);
    let count = 0;
    for (let i = 0; i < carrinho.length; i = +1) {
      if (item[i] === carrinho[i]) {
        count = +1;
      }
    }
    return count;
  };

  render() {
    // const { carrinho } = this.state;
    // console.log(typeof carrinho);
    // return (carrinho.length > 0 && carrinho.map((item) => (
    //   <p
    //     key={ item.id }
    //   >
    //     { item.id }
    //   </p>

    // )));
    const { carrinho } = this.state;
    console.log(carrinho);
    return (
      <div>
        {/* <p>Seu carrinho está vazio</p> */}
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        { carrinho.length > 0 && carrinho.map((item, i) => (
          <div key={ i }>
            <p data-testid="shopping-cart-product-name">
              { item.title }
            </p>
            <p data-testid="shopping-cart-product-quantity">
              { this.funcQuantidade(item.id) }
            </p>
          </div>
        )) }
      </div>
    );
  }
}
