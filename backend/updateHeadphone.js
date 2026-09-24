const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const Product = require("./models/Product");

async function updateImage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected ✅");

    const result = await Product.updateOne(
      { name: "Premium Wireless Headphones" },
      { image: "/image/headphones.png" }
    );

    console.log("Headphones image updated ✅");
    console.log(result);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Update Error ❌");
    console.error(error.message);
  }
}

updateImage();