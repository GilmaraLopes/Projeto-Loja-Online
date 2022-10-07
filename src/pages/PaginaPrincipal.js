import PropTypes from 'prop-types';
import React from 'react';
import { getCategories } from '../services/api';

class PaginaPrincipal extends React.Component {
  state = {
    pesquisa: '',
    categorias: [],
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
    console.log(history);
    history.push('/carrinhodecompras');
  };

  render() {
    const { pesquisa, categorias } = this.state;
    return (
      <>
        <div>
          <input
            value={ pesquisa }
            name="pesquisa"
            onChange={ this.handleChange }
            type="text"
          />
          <div>

            <button
              data-testid="shopping-cart-button"
              type="button"
              name="btCarrinho"
              // onChange={ <CarrinhoDeCompras /> }
              onClick={ this.enableBtn }
            >
              xablau

            </button>
            {/* <CarrinhoDeCompras /> */}
          </div>
        </div>
        {categorias.map((item) => (
          <button data-testid="category" name={ item.name } type="button" key={ item.id }>
            {item.name}
          </button>
        ))}

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
