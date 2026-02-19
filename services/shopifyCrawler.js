const axios = require("axios");

async function crawlStore(storeUrl, query) {
  try {
    const url = `${storeUrl}/search/suggest.json?q=${encodeURIComponent(
      query
    )}&resources[type]=product`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const products = response.data.resources.results.products;

    if (!products) return [];

    return products.map((product) => ({
      website: storeUrl,
      title: product.title,
      price: product.price / 100,
      inStock: product.available,
    }));
  } catch (err) {
    return [];
  }
}

async function crawlMultipleStores(stores, query) {
  const promises = stores.map((store) =>
    crawlStore(store, query)
  );

  const results = await Promise.all(promises);

  return results.flat().filter((p) => p.inStock);
}

module.exports = { crawlMultipleStores };
