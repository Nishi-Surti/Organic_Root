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

app.listen(3000,()=>{
    console.log("Server running on port 3000")
});