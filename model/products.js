const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Fill The Name Field"],
      max: [255, "Max Length Of Name Is 255 Character"],
    },
    price: {
      type: Number,
      required: [true, "Please Fill The Price Field"],
    },
    description: {
      type: String,
      required: [true, "Please Fill The Description Field"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

const getData = async (limit) => {
  let products;
  if (limit) {
    products = await Product.find().limit(limit);
  } else {
    products = await Product.find();
  }
  return products;
};
const findById = async (id) => {
  return await Product.findById(id);
};

module.exports = {
  getData,
  findById,
};
