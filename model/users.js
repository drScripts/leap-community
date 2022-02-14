const mongoose = require("mongoose");
const { hash } = require("../services/hash");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name must not be null"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

const addUser = async (fullName, email, password, phoneNumber, address) => {
  await User.create({
    fullName,
    email,
    password: hash(password),
    phoneNumber,
    address,
  });
};

const getByEmail = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = {
  addUser,
  getByEmail,
};
