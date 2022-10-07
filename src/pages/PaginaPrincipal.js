import React from 'react';

class PaginaPrincipal extends React.Component {
  state = {
    pesquisa: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { pesquisa } = this.state;
    return (
      <>
        <div>
          <input
            value={ pesquisa }
            name="pesquisa"
            onChange={ this.handleChange }
            type="text"
          />
        </div>

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

export default PaginaPrincipal;
