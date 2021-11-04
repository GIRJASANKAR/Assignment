const express = require("express");
const Product = require("../models/product");
const router = new express.Router();

router.post("/pcreate", async (req, res) => {
  const add = new Product(req.body);
  try {
    await add.save();
    res.status(201).send(add);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/pread", async (req, res) => {
  try {
    const productList = await Product.find({});
    res.status(201).send(productList);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/pread/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const singleProduct = await Product.findById(_id);
    if (!singleProduct) {
      return res.status(404).send(singleProduct);
    }
    return res.status(201).send(singleProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/pupdate/:id", async (req, res) => {
  const trytoupdate = Object.keys(req.body); 
  const canOnlyUpdate = [
    "productId",
    "productName",
    "qtyPerUnit",
    "unitPrice",
    "unitInStock",
    "discontinued",
    "categoryId"
  ]; 
  const isValied = trytoupdate.every((updates) => {
    return canOnlyUpdate.includes(updates);
  });
  if (!isValied) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updatedProduct = await Product.findById(req.params.id);
    canOnlyUpdate.forEach((updates) => {
      updatedProduct[updates] = req.body[updates];
    });
        await updatedProduct.save();
    console.log(updatedProduct);
    if (!updatedProduct) {
      return res.status(400).send(updatedProduct);
    }
    return res.status(201).send(updatedProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/pdelete/:id", async (req, res) => {
  try {
    const deleteProduct = await User.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(400).send({ error: "there is nothing to delete" });
    }
    res.status(200).send(deleteProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
