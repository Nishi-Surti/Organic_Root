const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dv5dqc2zi",
  api_key: process.env.CLOUDINARY_API_KEY || "427263654741619",
  api_secret: process.env.CLOUDINARY_API_SECRET || "ngShW0mT42jumRNaS1oD8jgt6i",
});

module.exports = cloudinary;