const Fuse = require("fuse.js");

function matchProducts(query, products) {
  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: ["title"],
  };

  const fuse = new Fuse(products, options);
  const result = fuse.search(query);

  return result.map((r) => r.item);
}

module.exports = { matchProducts };
