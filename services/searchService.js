const axios = require("axios");
require("dotenv").config();

async function searchShopifyStores(query) {
  try {
    const searchQuery = `${query} site:myshopify.com`;

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: searchQuery,
        api_key: process.env.API_KEY,
        engine: "google",
      },
    });

    const results = response.data.organic_results || [];

    const storeUrls = results
      .map((result) => {
        try {
          const url = new URL(result.link);
          return url.origin;
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    // Remove duplicates
    return [...new Set(storeUrls)];
  } catch (err) {
    console.log("Search error:", err.message);
    return [];
  }
}

module.exports = { searchShopifyStores };
