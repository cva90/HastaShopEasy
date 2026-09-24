const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const Product = require("./models/Product");

const products = [
  {
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    stock: 20,
    rating: 4.5,
    description:
      "Modern smart watch with stylish design and useful everyday features.",
    image: "/image/smartwatch.png",
  },
  {
    name: "Running Shoes",
    price: 2499,
    category: "Fashion",
    stock: 30,
    rating: 4.4,
    description:
      "Comfortable running shoes designed for everyday activity and exercise.",
    image: "/image/runningshoe.png",
  },
  {
    name: "Travel Bag",
    price: 1999,
    category: "Travel",
    stock: 25,
    rating: 4.3,
    description:
      "Spacious and stylish travel bag suitable for short and long journeys.",
    image: "/image/travelbag.png",
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected ✅");

    await Product.insertMany(products);

    console.log("3 products added successfully ✅");

    await mongoose.connection.close();

  } catch (error) {
    console.error("Seed Error ❌");
    console.error(error.message);
  }
}

seedProducts();