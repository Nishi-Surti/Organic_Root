const mongoose = require("mongoose");
const cloudinary = require("./cloudinary");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Models
const Product_Detail = require("./models/Product_Detail");
const Farmer_Regis = require("./models/Farmer_Regis");

const uploadsDir = path.join(__dirname, "uploads");

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");
    console.log("Cloudinary Config:", {
        cloud_name: cloudinary.config().cloud_name,
        api_key: cloudinary.config().api_key
    });

    // Migrate Products
    console.log("Migrating Products...");
    const products = await Product_Detail.find({});
    for (const prod of products) {
      if (prod.pimg && !prod.pimg.startsWith("http")) {
        const localPath = path.join(__dirname, prod.pimg.startsWith("/") ? prod.pimg : "uploads/" + prod.pimg);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading product image: ${prod.pimg}`);
          const result = await cloudinary.uploader.upload(localPath, {
            folder: "products",
          });
          prod.pimg = result.secure_url;
          await prod.save();
          console.log(`Updated product ${prod.pname} with new URL`);
        } else {
            // Check if it's just the filename in uploads/
            const altPath = path.join(uploadsDir, prod.pimg.replace("/uploads/", ""));
            if (fs.existsSync(altPath)) {
                console.log(`Uploading product image (alt path): ${prod.pimg}`);
                const result = await cloudinary.uploader.upload(altPath, {
                  folder: "products",
                });
                prod.pimg = result.secure_url;
                await prod.save();
                console.log(`Updated product ${prod.pname} with new URL`);
            } else {
                console.warn(`File not found: ${localPath}`);
            }
        }
      }
    }

    // Migrate Farmers
    console.log("Migrating Farmers...");
    const farmers = await Farmer_Regis.find({});
    for (const farmer of farmers) {
      if (farmer.fimage && !farmer.fimage.startsWith("http")) {
        const localPath = path.join(uploadsDir, farmer.fimage);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading farmer image: ${farmer.fimage}`);
          const result = await cloudinary.uploader.upload(localPath, {
            folder: "farmers",
          });
          farmer.fimage = result.secure_url;
          await farmer.save();
          console.log(`Updated farmer ${farmer.name} with new URL`);
        } else {
          console.warn(`File not found for farmer: ${localPath}`);
        }
      }
    }

    console.log("Migration finished!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
