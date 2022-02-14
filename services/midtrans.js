const axios = require("axios").default;
const {
  midtransClientKey,
  midtransServerKey,
  midtransEndpoint,
} = require("../config");
const { findById } = require("../model/products");

const authString = Buffer.from(midtransServerKey + ":").toString("base64");

const addTransaction = async (id, methodPayment, size, user) => {
  const { name, price, description } = await findById(id);
  const snapBody = {
    transaction_details: {
      order_id: id,
      gross_amount: price,
    },
    item_details: {
      id: id,
      price: price,
      quantity: 1,
      name: name,
      brand: "Leap Production",
      category: "Shirt",
      merchant_name: "Leap Community",
      size,
      description,
    },
    customer_details: {
      first_name: user.fullName,
      email: user.email,
      phone: user.phoneNumber,
      shipping_address: {
        address: user.address,
      },
    },
    enabled_payments: [methodPayment],
    callbacks: {
      finish: "https://leap-community.herokuapp.com/success",
    },
  };

  const { data } = await axios.post(midtransEndpoint, snapBody, {
    headers: {
      Authorization: `Basic ${authString}`,
    },
  });

  return data.redirect_url;
};

module.exports = { addTransaction };
