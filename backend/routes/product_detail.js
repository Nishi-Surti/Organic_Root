const path = require("path");
const express = require("express");
const router = express.Router();
const Product_Detail = require("../models/Product_Detail");
const Farmer_Regis = require("../models/Farmer_Regis");
const multer = require("multer");
const My_Products = require("../models/My_Products");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

console.log("✅ product_detail route loaded");

router.post("/add-product", upload.single("pimg"), async (req, res) => {
  try {
    const lastProduct = await Product_Detail.findOne().sort({ product_id: -1 });

    let newproduct_id = 1;

    if (lastProduct) {
      newproduct_id = lastProduct.product_id + 1;
    }

    // ✅ Farmer ID from frontend
    const farmerId = Number(req.body.f_id);

    // ✅ Farmer find karo
    const farmer = await Farmer_Regis.findOne({ f_id: farmerId });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer Not Found" });
    }

    // ✅ Image path
    const imagePath = req.file ? "/uploads/" + req.file.filename : "";

    const newProduct = new Product_Detail({
      f_id: farmer.f_id,
      farmerName: farmer.name,
      farmerVillage: farmer.village,

      product_id: newproduct_id,
      category: req.body.category,
      pname: req.body.pname,
      price: req.body.price,
      priceUnit: req.body.priceUnit,
      quantity: req.body.quantity,
      quantityUnit: req.body.quantityUnit,
      pimg: imagePath,
    });

    await newProduct.save();

    console.log("✅ Product added successfully");

    (console.log("Product route loaded"),
      res.status(200).json({
        message: "Product added succesfully",
        product: newProduct,
      }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/my-products/:farmerId", async (req, res) => {
  try {
    const farmerId = Number(req.params.farmerId);

    const products = await Product_Detail.find({
      f_id: farmerId,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all-products", async (req, res) => {
  try {
    const products = await Product_Detail.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-products/:productId", async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    await Product_Detail.deleteOne({ product_id: productId });

    res.json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put(
  "/update-product/:productId",
  upload.single("pimg"),
  async (req, res) => {
    try {
      const productId = Number(req.params.productId);

      const updateData = {
        category: req.body.category,
        pname: req.body.pname,
        price: req.body.price,
        priceUnit: req.body.priceUnit,
        quantity: req.body.quantity,
        quantityUnit: req.body.quantityUnit,
      };

      // Image change thay to update karo
      if (req.file) {
        updateData.pimg = "/uploads/" + req.file.filename;
      }

      const updatedProduct = await Product_Detail.findOneAndUpdate(
        { product_id: productId },
        updateData,
        { new: true },
      );

      res.json({
        message: "Product Updated Successfully",
        product: updatedProduct,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

module.exports = router;
