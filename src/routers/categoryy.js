const express = require("express");
const Category = require("../models/Category");

const router = new express.Router();

router.post("/ccreate", async (req, res) => {
  const add = new Category(req.body);
  try {
    await add.save();
    res.status(201).send(add);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/cread", async (req, res) => {
  try {
    const categoryList = await Category.find({});
    res.status(201).send(categoryList);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/cread/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const singleCategory = await Category.findById(_id);
    if (!singleCategory) {
      return res.status(404).send(singleCategory);
    }
    return res.status(201).send(singleCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/cupdate/:id", async (req, res) => {
  const trytoupdate = Object.keys(req.body); //an array of keys which u try to update
  const canOnlyUpdate = ["categoryId", "categoryName"];
  const isValied = trytoupdate.every((updates) => {
    return canOnlyUpdate.includes(updates);
  });
  if (!isValied) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updatedCategory = await Category.findById(req.params.id);

    canOnlyUpdate.forEach((updates) => {
      updatedCategory[updates] = req.body[updates];
    });

    await updatedCategory.save();

    if (!updatedCategory) {
      return res.status(400).send(updatedCategory);
    }
    return res.status(201).send(updatedCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/cdelete/:id", async (req, res) => {
  try {
    const deleteCategory = await User.findByIdAndDelete(req.params.id);
    if (!deleteCategory) {
      return res.status(400).send({ error: "there is nothing to delete" });
    }
    res.status(200).send(deleteCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
