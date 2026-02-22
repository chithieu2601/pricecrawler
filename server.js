require("dotenv").config();
const express = require("express");
const priceRoutes = require("./routes/priceRoutes");

const app = express();

app.use(express.json());
app.use("/", priceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mystic price crawler running on port ${PORT}`);
});
