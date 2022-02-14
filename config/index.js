require("dotenv").config();

module.exports = {
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY,
  midtransEndpoint: process.env.MIDTRANS_SNAP_ENDPOINT,
  dbUrl: process.env.DB_URL_MONGO,
};
