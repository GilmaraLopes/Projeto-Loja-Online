import PropTypes from 'prop-types';
import React from 'react';
// import {
//   Link,

// } from 'react-router-dom';
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

  clickCategoria = async (item) => {
    await this.setState({ categoriaID: item });
    this.renderizaItens();
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
            {/* <Link component={}/> */}
            {item.name}
          </button>
        ))}
        {itensLoja.length > 1 && mostrarItens === true
          ? itensLoja.map((item) => (
            <div data-testid="product" key={ item.id }>
              {' '}
              <p>{item.title}</p>
              <img alt="Produto" src={ item.thumbnail } />
              <p>{item.price}</p>
            </div>
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
