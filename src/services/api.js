export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriaProdutos = await response.json();
  return categoriaProdutos;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  let url = '';
  if (QUERY.length > 0 && CATEGORY_ID.length === 0) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  }
  if (QUERY.length === 0 && CATEGORY_ID.length > 0) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
  }

  if (QUERY.length > 0 && CATEGORY_ID.length > 0) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;
  }
  const fetchApi = await fetch(url);
  const products = await fetchApi.json();
  return products;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
