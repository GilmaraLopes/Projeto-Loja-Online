import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProdutoDetalhesHtml extends React.Component {
  componentDidMount() {
    const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoLocalStorage'));
    if (carrinhoItems !== null) {
      this.quantidadeCarrinho();
    }
  }

  quantidadeCarrinho = () => {
    const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoLocalStorage'));
    if (carrinhoItems !== null) {
      const carrinhoQuantidade = carrinhoItems.length;
      localStorage.setItem('quantidadeCarrinho', carrinhoQuantidade);
    }
  };

  render() {
    const { produtoId, email, text, mostrarForm,
      infosForm, enableBtn, handleChange, enviarInfos,
      addCarrinho, formValidade } = this.props;
    console.log(produtoId);
    return (
      <div>
        <Link to="/CarrinhoDeCompras" data-testid="product-detail-link">
          <h3 data-testid="product-detail-name">{produtoId.title}</h3>
          <div data-testid="product-detail-image">
            <img alt="Produto" src={ produtoId.thumbnail } />
          </div>
          <p data-testid="product-detail-price">{produtoId.price}</p>
        </Link>
        <p data-testid="shopping-cart-size">
          { JSON.parse(localStorage.getItem('quantidadeCarrinho'))}

        </p>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ enableBtn }
        >
          Carrinho
        </button>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCarrinho(produtoId) }
        >
          Comprar
        </button>
        <div>
          {' '}
          <Link to="/">
            {' '}
            <img
              src="https://img.icons8.com/ios/50/000000/left2.png"
              alt="voltar"
            />
            {' '}
          </Link>
          {' '}
        </div>
        <form>
          <label htmlFor="emailInput">
            Email
            <input
              onChange={ handleChange }
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
              onChange={ handleChange }
              name="text"
              data-testid="product-detail-evaluation"
              id="commentForm"
              type="text"
              value={ text }
            />
          </label>

          <label htmlFor="nota1">
            {' '}
            <input
              onClick={ handleChange }
              data-testid="1-rating"
              type="radio"
              id="nota1"
              name="rating"
              value="1"
            />
            1
          </label>
          <label htmlFor="nota2">
            {' '}
            <input
              onClick={ handleChange }
              data-testid="2-rating"
              type="radio"
              id="nota2"
              name="rating"
              value="2"
            />
            2
          </label>
          <label htmlFor="nota3">
            {' '}
            <input
              onClick={ handleChange }
              data-testid="3-rating"
              type="radio"
              id="nota3"
              name="rating"
              value="3"
            />
            3
          </label>
          <label htmlFor="nota4">
            {' '}
            <input
              onClick={ handleChange }
              data-testid="4-rating"
              type="radio"
              id="nota4"
              name="rating"
              value="4"
            />
            4
          </label>
          <label htmlFor="nota5">
            {' '}
            <input
              onClick={ handleChange }
              data-testid="5-rating"
              type="radio"
              id="nota5"
              name="rating"
              value="5"
            />
            5
          </label>
          <button
            onClick={ enviarInfos }
            type="button"
            data-testid="submit-review-btn"
          >
            Enviar
          </button>

          { formValidade && (<p data-testid="error-msg">Campos inválidos</p>)}
          {mostrarForm
                  && infosForm.map((item, i) => (
                    <div key={ i }>

                      <p data-testid="review-card-email">{item.email}</p>
                      <p data-testid="review-card-rating">
                        {' '}
                        {item.rating}
                      </p>
                      <p data-testid="review-card-evaluation">
                        {' '}
                        {item.text}
                      </p>
                    </div>
                  ))}
        </form>
      </div>
    );
  }
}

ProdutoDetalhesHtml.propTypes = {
  addCarrinho: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  enableBtn: PropTypes.func.isRequired,
  enviarInfos: PropTypes.func.isRequired,
  formValidade: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  infosForm: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  mostrarForm: PropTypes.func.isRequired,
  produtoId: PropTypes.shape({
    price: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
};

export default ProdutoDetalhesHtml;
