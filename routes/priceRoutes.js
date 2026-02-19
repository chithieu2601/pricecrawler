const express = require("express");
const router = express.Router();

const { searchShopifyStores } = require("../services/searchService");
const { crawlMultipleStores } = require("../services/shopifyCrawler");
const { matchProducts } = require("../services/matcher");
const { saveToCSV } = require("../services/csvWriter");

router.get("/price-check", async (req, res) => {
  const query = req.query.product;

  if (!query) {
    return res.status(400).json({ error: "Product required" });
  }

  try {
    const stores = await searchShopifyStores(query);

    const crawled = await crawlMultipleStores(stores, query);

    const matched = matchProducts(query, crawled);

    const filePath = await saveToCSV(query, matched);

    res.json({
      storesFound: stores.length,
      productsFound: matched.length,
      csvFile: filePath,
      data: matched,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
