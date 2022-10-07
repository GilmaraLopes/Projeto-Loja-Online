export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriaProdutos = await response.json();
  return categoriaProdutos;
}

export async function getProductsFromCategoryAndQuery(QUERY) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const fetchApi = await fetch(url);
  const products = await fetchApi.json();
  return products;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
