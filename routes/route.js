const express = require("express");
const app = express();
const router = require("router")
const route = router()

const { createUser , CreditUserWallet, DebitUserWallet, addBalance, seeAllTransaction, transactionReverse} = require("../controllers/userController.js");


//users
route.post("/api/users", createUser);
route.post("/api/users/:userId/credit", CreditUserWallet);
route.post("/api/users/:userId/debit",DebitUserWallet);
route.get("/api/users/:userID/balance", addBalance);

//transactions
route.get("/api/transaction/:transactionId/transaction", seeAllTransaction);
route.post("/api/transaction/:transactionId/transaction", transactionReverse);





module.exports = route;