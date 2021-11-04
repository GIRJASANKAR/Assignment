const express = require("express");
require("./src/db/mongoose")
const ProductRouter = require("./src/routers/productt");
const CategoryRouters = require("./src/routers/categoryy");
const app = express();
app.use(express.json());
app.use(ProductRouter);
app.use(CategoryRouters);

app.listen(3000, () => {
  console.log("server is running...");
});
