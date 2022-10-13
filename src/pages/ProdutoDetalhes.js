import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import ProdutoDetalhesHtml from './ProdutoDetalhesHtml';

export default class ProdutoDetalhes extends Component {
  state = {
    produtoId: '',
    carrinho: [],
    email: '',
    rating: '',
    text: '',
    mostrarForm: false,
    infosForm: [],
    formValidade: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    const urlString = 17;
    const pathId = pathname.substring(urlString);
    const products = await getProductById(pathId);
    this.setState({
      produtoId: products,
    });
    if (JSON.parse(localStorage.getItem(products.id) !== null)) {
      this.setState({
        mostrarForm: true,
        infosForm: JSON.parse(localStorage.getItem(products.id)),
      });
    }
    if (JSON.parse(localStorage.getItem('carrinhoLocalStorage') !== null)) {
      this.setState({
        carrinho: JSON.parse(localStorage.getItem('carrinhoLocalStorage')),
      });
    }
  }

  validadeForm = () => {
    const { email, rating } = this.state;
    const arrayValidade = [
      email.length > 0,
      rating.length > 0,
      // crazy email validator Regex
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email),
    ];
    return arrayValidade.includes(false);
  };

  // enviarInfos = async () => {
  //   this.setState({
  //     formValidade: this.validadeForm(),
  //   }, () => this.enviaInfosAsync());
  // };

  enviarInfos = () => {
    const validacao = this.validadeForm();

    const { email, rating, text } = this.state;
    if (validacao === false) {
      const { history } = this.props;
      const { pathname } = history.location;
      const { produtoId } = this.state;
      const urlString = 17;
      const pathId = pathname.substring(urlString);
      const objInfos = [{ email, text, rating }];
      const todos = JSON.parse(localStorage.getItem(produtoId.id));
      if (todos !== null) {
        const arrayTodos = [...todos, ...objInfos];
        localStorage.setItem(produtoId.id, JSON.stringify(arrayTodos));
      } else {
        localStorage.setItem(produtoId.id, JSON.stringify(objInfos));
      }
      // const products = await getProductById(pathId);
      this.setState({
        mostrarForm: true,
        infosForm: JSON.parse(localStorage.getItem(pathId)),
        email: '',
        rating: '',
        text: '',
        formValidade: validacao,
      });
    } else {
      this.setState({
        formValidade: validacao,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.setState({ formValidade: this.validadeForm() }));
  };

  addCarrinhoAsync = () => {
    const { carrinho } = this.state;
    localStorage.setItem('carrinhoLocalStorage', JSON.stringify(carrinho));
  };

  addCarrinho = (item) => {
    item.quantidade = 1;
    this.setState(
      (prevState) => ({
        carrinho: [...prevState.carrinho, item],
      }),
      this.addCarrinhoAsync,
    );
  };

  enableBtn = () => {
    const { history } = this.props;
    history.push('/carrinhodecompras');
  };

  render() {
    const { produtoId, email, text, mostrarForm, infosForm, formValidade,
    } = this.state;
    return (<ProdutoDetalhesHtml
      produtoId={ produtoId }
      email={ email }
      text={ text }
      mostrarForm={ mostrarForm }
      infosForm={ infosForm }
      enviarInfos={ this.enviarInfos }
      handleChange={ this.handleChange }
      addCarrinho={ this.addCarrinho }
      enableBtn={ this.enableBtn }
      formValidade={ formValidade }

    />);
  }
}
ProdutoDetalhes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.string,
  }).isRequired,
};
