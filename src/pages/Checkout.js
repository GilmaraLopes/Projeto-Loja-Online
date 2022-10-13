import PropTypes from 'prop-types';
import React from 'react';

class Checkout extends React.Component {
  state = {
    carrinho: '',
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    formValidade: false,
  };

  componentDidMount() {
    this.setState({
      carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  validadeForm = () => {
    const { email, fullname, cpf, phone, cep, address, payment } = this.state;
    const arrayValidade = [
      email.length > 0,
      fullname.length > 0,
      cpf.length > 0,
      phone.length > 0,
      cep.length > 0,
      address.length > 0,
      payment.length > 0,
    ];
    return arrayValidade.includes(false);
  };

  enviarInfos = () => {
    const { history } = this.props;
    const validacao = this.validadeForm();
    this.setState({
      formValidade: validacao,
    });

    if (validacao === false) {
      history.push('/');
      localStorage.removeItem('carrinhoLocalStorage');
    }
  };

  render() {
    const { carrinho, formValidade } = this.state;
    return (
      carrinho.length > 0 && (
        <div>
          {carrinho.map((item) => (
            <div key={ item.title }>
              <p>{item.title}</p>
            </div>
          ))}
          )
          <label htmlFor="fullname">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Name"
            />
          </label>
          <label htmlFor="email">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-email"
              id="email"
              type="text"
              name="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="cpf">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
              id="cpf"
              type="text"
              name="cpf"
              placeholder="CPF"
            />
          </label>
          <label htmlFor="phone">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-phone"
              id="phone"
              type="text"
              name="phone"
              placeholder="phone"
            />
          </label>
          <label htmlFor="cep">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-cep"
              id="cep"
              type="text"
              name="cep"
              placeholder="cep"
            />
          </label>
          <label htmlFor="address">
            <input
              onChange={ this.handleChange }
              data-testid="checkout-address"
              id="address"
              type="text"
              name="address"
              placeholder="address"
            />
          </label>
          <label htmlFor="payment">
            <input
              onChange={ this.handleChange }
              data-testid="ticket-payment"
              id="ticket"
              type="radio"
              name="payment"
              value="ticket"
            />
            <input
              onChange={ this.handleChange }
              data-testid="visa-payment"
              id="visa"
              type="radio"
              name="payment"
              value="visa"
            />
            <input
              onChange={ this.handleChange }
              data-testid="master-payment"
              id="master"
              type="radio"
              name="payment"
              value="master"
            />
            <input
              onChange={ this.handleChange }
              data-testid="elo-payment"
              id="elo"
              type="radio"
              name="payment"
              value="elo"
            />
          </label>
          {formValidade && <p data-testid="error-msg">Campos inválidos</p>}
          <button
            onClick={ this.enviarInfos }
            type="button"
            data-testid="checkout-btn"
          >
            Enviar
          </button>
        </div>
      )
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Checkout;
