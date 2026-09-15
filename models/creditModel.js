const mongoose = require("mongoose");

const creditWalletSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: enum["DEBIT", "CREDIT","REVERSAL"],
    },
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: enum["SUCCESS", "FAILED", "PENDING"],
    },
    balance: {
        type: Number,
        default: 0,
    },
    reference: {
        type: String
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Wallet" , creditWalletSchema);