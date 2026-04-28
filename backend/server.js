const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads",express.static("uploads"));

mongoose.connect("mongodb+srv://admin:admin123@organic-root.xvas9aq.mongodb.net/organic-root")
.then(()=>console.log("MongoDB Connected"))
.catch(err => console.log(err));

// const farmerRoutes = require("./routes/farmer");
// app.use("/api",farmerRoutes);
const productRoutes = require("./routes/product")
app.use("/api/product",productRoutes)

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

const adminManageCategory = require('./routes/admin-manage-category');
app.use('/api/adminManageCategory', adminManageCategory);

const farmerLogin = require("./routes/farmer_login");
app.use('/api',farmerLogin);

const consumerLogin = require("./routes/consumer_login");
app.use('/api',consumerLogin);

const farmerRoutes = require('./routes/farmer_regis');
app.use('/api/',farmerRoutes);

const consumerRoutes = require('./routes/consumer_regis');
app.use('/api/',consumerRoutes);

const orderRoutes = require("./routes/place-order");
app.use("/api",orderRoutes);

const product_detailRoutes = require('./routes/product_detail');
app.use('/api/productDetail',product_detailRoutes);

const adminProductRoute = require('./routes/admin-product');
app.use('/api/adminProduct',adminProductRoute);

const farmerApprovalRoutes = require('./routes/farmerApproval');
app.use('/api', farmerApprovalRoutes);

const earningRoutes = require("./routes/farmer-earning");
app.use("/api", earningRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api", contactRoutes);

const LoginSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  password: String,
  role: String
});

const Login = mongoose.model("Login", LoginSchema);

app.post("/login", async (req, res) => {
  const newLogin = new Login(req.body);
  await newLogin.save();
  res.json({ message: "Saved successfully" });
});

app.post("/api/forgot-password", async (req, res) => {
  try {
    const { role, identifier, newPassword } = req.body;

    if (role === "farmer") {
      const farmer = await mongoose.connection.collection("farmer_details").findOne({ mobile: Number(identifier) });
      if (!farmer) return res.status(404).json({ message: "Farmer not found with this mobile number" });
      await mongoose.connection.collection("farmer_details").updateOne({ mobile: Number(identifier) }, { $set: { password: newPassword } });
    } else if (role === "consumer") {
      const consumer = await mongoose.connection.collection("consumer_detail").findOne({ mobile: Number(identifier) });
      if (!consumer) return res.status(404).json({ message: "Consumer not found with this mobile number" });
      await mongoose.connection.collection("consumer_detail").updateOne({ mobile: Number(identifier) }, { $set: { password: newPassword } });
    } else if (role === "admin") {
      const admin = await mongoose.connection.collection("admins").findOne({ email: identifier });
      if (!admin) return res.status(404).json({ message: "Admin not found with this email" });
      await mongoose.connection.collection("admins").updateOne({ email: identifier }, { $set: { password: newPassword } });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});