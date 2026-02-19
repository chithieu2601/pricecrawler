const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

async function saveToCSV(query, data) {
  if (!data.length) return null;

  const safeName = sanitizeFilename(query);
  const filename = `${safeName}_${Date.now()}.csv`;
  const filePath = path.join(__dirname, "..", "data", filename);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "website", title: "Website" },
      { id: "title", title: "Product Title" },
      { id: "price", title: "Price" },
      { id: "inStock", title: "In Stock" },
    ],
  });

  await csvWriter.writeRecords(data);

  return filePath;
}

module.exports = { saveToCSV };
