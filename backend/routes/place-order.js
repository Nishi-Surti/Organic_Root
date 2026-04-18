const express = require('express');
const router = express.Router();

const Place_Order = require('../models/Place_Order');
const Product = require('../models/Product_Detail');
const Farmer = require('../models/Farmer_Regis');
const Consumer = require('../models/Consumer_Regis');
router.post("/place-order", async (req, res) => {
  try {

    console.log("BODY:", req.body); // 🔥 DEBUG

    const lastOrder = await Place_Order.findOne().sort({ order_id: -1 });

    let neworder_id = 101;
    if (lastOrder) {
      neworder_id = lastOrder.order_id + 1;
    }

    const {
      c_id,
      cname,
      mobile,
      address,
      city,
      pincode,
      items,
      paymentMethod
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items received" });
    }

    for (let item of items) {

      console.log("ITEM:", item); // 🔥 DEBUG

      const product = await Product.findOne({
        product_id: Number(item.product_id)   // 🔥 IMPORTANT FIX
      });

      if (!product) {
        console.log("❌ PRODUCT NOT FOUND:", item.product_id);
        continue; // skip this item
      }

      const farmer = await Farmer.findOne({
        f_id: Number(product.f_id)
      });

      if (!farmer) {
        console.log("❌ FARMER NOT FOUND:", product.f_id);
        continue;
      }

      const newOrder = new Place_Order({

        order_id: neworder_id,

        c_id,
        cname,
        mobile,
        address,
        city,
        pincode,

        f_id: farmer.f_id,
        farmerName: farmer.name,
        farmerVillage: farmer.village,

        product_id: product.product_id,
        pimg: product.pimg,
        pname: product.pname,
        category: product.category,
        price: product.price,
        priceUnit: product.priceUnit,

      quantity: item.quantity,
        quantityUnit: product.quantityUnit,
        totalPrice: item.totalPrice,

        paymentMethod,
        orderStatus: "Confirmed",

      });

      await newOrder.save();
    }

    res.json({
      message: "Order placed successfully",
      order_id: neworder_id
    });l

  } catch (err) {
    console.log("🔥 FULL ERROR:", err);
    console.log("🔥 FULL ERROR:", err);
    res.status(500).json(err);
  }
});

router.get("/consumer-orders/:c_id", async(req,res)=>{

try{

const orders = await Place_Order.find({
c_id: Number(req.params.c_id)   // 👈 FIX
}).sort({orderDate:-1});

res.json(orders);

}
catch(err){
res.status(500).json(err);
}

});

router.get("/consumer/:id", async (req, res) => {
  try {

    const consumer = await Consumer.findOne({
      c_id: Number(req.params.id)
    });

    if(!consumer){
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.json(consumer);

  } catch(err){
    res.status(500).json(err);
  }
});

router.get("/farmer-orders/:f_id", async (req, res) => {
  try {

    const orders = await Place_Order.find({
      f_id: Number(req.params.f_id)
    }).sort({ orderDate: -1 });

    res.json(orders);

  } catch(err){
    res.status(500).json(err);
  }
});

router.put("/update-order-status/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const newStatus = req.body.status;

    await Place_Order.updateOne(
      { order_id: orderId },
      { orderStatus: newStatus }
    );

    res.send({ message: "Status Updated Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error updating status" });
  }
});

router.put("/cancel-order/:id", async (req, res) => {
  try {

    const orderId = parseInt(req.params.id);

    await Place_Order.updateOne(
      { order_id: orderId },
      { orderStatus: "Cancelled" }
    );

    res.send({ message: "Order Cancelled Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error cancelling order" });
  }
});

router.delete("/delete-order/:id", async (req, res) => {
  try {

    const orderId = parseInt(req.params.id);

    await Place_Order.deleteOne({ order_id: orderId });

    res.send({ message: "Order Deleted Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting order" });
  }
});
router.get("/recent-orders/:f_id", async (req, res) => {
  try {

    console.log("PARAM RECEIVED:", req.params.f_id); // 👈 ADD THIS

    const farmerId = parseInt(req.params.f_id);

    // console.log("PARSED ID:", farmerId); // 👈 ADD THIS

    const orders = await Place_Order.find({
      f_id: farmerId
    })
    .sort({ orderDate: -1 })
    .limit(5);

    // console.log("ORDERS:", orders); // 👈 ADD THIS

    res.json(orders);

  } catch (err) {
    console.log("🔥 BACKEND ERROR:", err); // 👈 MOST IMPORTANT
    res.status(500).json(err);
  }
});

module.exports = router;